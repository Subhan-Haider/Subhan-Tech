import { NextResponse } from 'next/server';
import { productService } from '@/lib/services/products';
import { surveyService } from '@/lib/services/surveys';

export async function GET(
    request: Request,
    { params }: { params: { extensionId: string } }
) {
    try {
        const products = await productService.getAll();
        const extension = products.find(p => p.meta?.chromeId === params.extensionId);

        if (!extension) {
            return NextResponse.json({ error: 'Extension not registered' }, { status: 404 });
        }

        // Staged Rollout logic
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get('uid') || '0';
        const rolloutPercentage = extension.meta?.stagedRollout ?? 100;

        // Simple hash of UID to a number 0-99
        let bucket = 0;
        for (let i = 0; i < uid.length; i++) {
            bucket = (bucket + uid.charCodeAt(i)) % 100;
        }

        const isIncluded = bucket < rolloutPercentage;
        const country = request.headers.get('x-vercel-ip-country') || 'global';

        // Check for emergency kill switch
        if (extension.status === 'Archived') {
            return NextResponse.json({
                status: 'archived',
                kill: true,
                message: 'This extension has been decommissioned.',
                redirectUrl: 'https://subhan.tech/notice/decommissioned'
            });
        }

        // Build config payload
        const config = {
            id: extension.id,
            name: extension.name,
            version: extension.version,
            status: extension.status,
            rollout: {
                active: isIncluded,
                percentage: rolloutPercentage
            },
            context: {
                region: country,
                environment: process.env.NODE_ENV
            },
            config: {
                surveyId: extension.meta?.surveyId,
                surveyUrl: extension.meta?.surveyId ? `https://subhan.tech/survey/${extension.meta.surveyId}` : null,
                privacyUrl: `https://subhan.tech/legal/${extension.id}/privacy`,
                termsUrl: `https://subhan.tech/legal/${extension.id}/terms`,
                redirects: {
                    install: extension.meta?.redirectUrls?.install || `https://subhan.tech/success/${extension.id}`,
                    update: extension.meta?.redirectUrls?.update || 'https://subhan.tech/update',
                    uninstall: extension.meta?.redirectUrls?.uninstall || 'https://subhan.tech/go/uninstall-feedback'
                },
                flags: {
                    enableSurvey: !!extension.meta?.surveyId && extension.status === 'Live',
                    maintenance: extension.status === 'Beta',
                    canary: !isIncluded,
                    debug: process.env.NODE_ENV === 'development'
                },
                messages: {
                    banner: extension.status === 'Beta' ? 'You are running an experimental build.' : null,
                    rolloutNotice: !isIncluded ? 'You are on a stable legacy release. New features rolling out soon.' : null
                },
                features: extension.features || []
            }
        };

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: 'Neural bridge failure' }, { status: 500 });
    }
}
