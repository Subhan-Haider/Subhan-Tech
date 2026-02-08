"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Key, Eye, Server, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function GuidesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/docs" className="text-sm text-white/40 hover:text-white transition-colors mb-4 inline-block">
                        ← Back to Documentation
                    </Link>
                    <h1 className="text-5xl font-bold mb-4 text-glow">Security & Best Practices</h1>
                    <p className="text-xl text-white/60">
                        Essential security guidelines for building secure, production-ready applications.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-12"
                >
                    {/* Authentication */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Lock className="w-8 h-8" />
                            Authentication & Authorization
                        </h2>
                        <p className="text-white/60 mb-6">
                            Implement secure authentication using industry-standard practices:
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-3">JWT Token Authentication</h3>
                                <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <pre className="text-white/80">{`import jwt from 'jsonwebtoken';

// Generate token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Middleware for protected routes
export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}`}</pre>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                <p className="text-sm text-yellow-500 font-bold mb-2">⚠️ Security Tips</p>
                                <ul className="text-sm text-white/60 space-y-1 ml-4 list-disc">
                                    <li>Never store JWT secrets in client-side code</li>
                                    <li>Use HTTPS for all authentication endpoints</li>
                                    <li>Implement token refresh mechanism</li>
                                    <li>Set appropriate token expiration times</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Data Encryption */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Key className="w-8 h-8" />
                            Data Encryption
                        </h2>
                        <p className="text-white/60 mb-6">
                            Protect sensitive data with encryption:
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-bold mb-3">Password Hashing</h3>
                                <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <pre className="text-white/80">{`import bcrypt from 'bcrypt';

// Hash password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Verify password
const isValid = await bcrypt.compare(
  inputPassword, 
  storedHashedPassword
);`}</pre>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">Encrypting Sensitive Data</h3>
                                <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <pre className="text-white/80">{`import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);

// Encrypt
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}

// Decrypt
function decrypt(encrypted, iv, authTag) {
  const decipher = crypto.createDecipheriv(
    algorithm, 
    key, 
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}`}</pre>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* API Security */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Server className="w-8 h-8" />
                            API Security
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-3">Rate Limiting</h3>
                                <p className="text-white/60 mb-3">Prevent abuse with rate limiting:</p>
                                <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <pre className="text-white/80">{`import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

app.use('/api/', limiter);`}</pre>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">Input Validation</h3>
                                <p className="text-white/60 mb-3">Always validate and sanitize user input:</p>
                                <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <pre className="text-white/80">{`import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(50)
});

// Validate request
try {
  const validData = userSchema.parse(req.body);
  // Process valid data
} catch (error) {
  return res.status(400).json({ 
    error: 'Invalid input', 
    details: error.errors 
  });
}`}</pre>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">CORS Configuration</h3>
                                <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <pre className="text-white/80">{`import cors from 'cors';

const corsOptions = {
  origin: ['https://subhan.tech', 'https://app.subhan.tech'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));`}</pre>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Privacy */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Eye className="w-8 h-8" />
                            Privacy & Data Protection
                        </h2>

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <p className="text-sm text-blue-400 font-bold mb-2">GDPR Compliance</p>
                                <ul className="text-sm text-white/60 space-y-2 ml-4 list-disc">
                                    <li>Obtain explicit consent before collecting data</li>
                                    <li>Provide clear privacy policy</li>
                                    <li>Allow users to export their data</li>
                                    <li>Implement right to be forgotten (data deletion)</li>
                                    <li>Use data minimization principles</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">Data Anonymization</h3>
                                <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <pre className="text-white/80">{`// Hash user identifiers for analytics
import crypto from 'crypto';

function anonymizeUserId(userId) {
  return crypto
    .createHash('sha256')
    .update(userId + process.env.SALT)
    .digest('hex');
}

// Store only anonymized data
analytics.track({
  userId: anonymizeUserId(user.id),
  event: 'page_view',
  // Don't include PII
});`}</pre>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Security Checklist */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Shield className="w-8 h-8" />
                            Security Checklist
                        </h2>

                        <div className="space-y-3">
                            {[
                                "Use HTTPS everywhere",
                                "Implement Content Security Policy (CSP)",
                                "Enable HSTS (HTTP Strict Transport Security)",
                                "Sanitize all user inputs",
                                "Use parameterized queries to prevent SQL injection",
                                "Keep dependencies up to date",
                                "Implement proper error handling (don't expose stack traces)",
                                "Use environment variables for secrets",
                                "Enable 2FA for admin accounts",
                                "Regular security audits and penetration testing",
                                "Implement logging and monitoring",
                                "Use secure session management",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <input type="checkbox" className="mt-1" />
                                    <span className="text-white/60">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Common Vulnerabilities */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <AlertTriangle className="w-8 h-8" />
                            Common Vulnerabilities to Avoid
                        </h2>

                        <div className="space-y-4">
                            {[
                                {
                                    name: "XSS (Cross-Site Scripting)",
                                    desc: "Sanitize user input and use Content Security Policy",
                                    severity: "High"
                                },
                                {
                                    name: "SQL Injection",
                                    desc: "Use parameterized queries and ORMs",
                                    severity: "Critical"
                                },
                                {
                                    name: "CSRF (Cross-Site Request Forgery)",
                                    desc: "Implement CSRF tokens for state-changing operations",
                                    severity: "High"
                                },
                                {
                                    name: "Insecure Direct Object References",
                                    desc: "Validate user permissions before accessing resources",
                                    severity: "Medium"
                                },
                                {
                                    name: "Sensitive Data Exposure",
                                    desc: "Encrypt data at rest and in transit",
                                    severity: "Critical"
                                },
                            ].map((vuln, i) => (
                                <div key={i} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-bold text-red-400">{vuln.name}</p>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${vuln.severity === "Critical" ? "bg-red-500/30 text-red-300" :
                                                vuln.severity === "High" ? "bg-orange-500/30 text-orange-300" :
                                                    "bg-yellow-500/30 text-yellow-300"
                                            }`}>
                                            {vuln.severity}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/60">{vuln.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
