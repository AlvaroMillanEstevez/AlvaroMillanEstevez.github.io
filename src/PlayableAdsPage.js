import React from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  Github,
  Languages,
  Layers,
  Linkedin,
  Mail,
  Package,
  Repeat,
  Ruler,
  Send,
  ShieldCheck,
  Wrench
} from 'lucide-react';

const KIT_URL = 'https://github.com/AlvaroMillanEstevez/phaser-playable-kit';
const DEMO_URL = 'https://alvaromillanestevez.github.io/phaser-playable-kit/';
const NETWORKS_DOC_URL = `${KIT_URL}/blob/main/docs/networks.md`;
const LINKEDIN_URL = 'https://www.linkedin.com/in/alvaro-millan-estevez-27b814375';

// The Meta builds are the ones that run on their own in an iframe: the MRAID and Google
// builds wait for the ad container, which only exists inside the networks and the kit's demo.
const demos = [
  {
    title: 'Nusa: Warung Sort',
    mechanic: 'Sorting puzzle',
    src: `${DEMO_URL}builds/warung-sort/meta.html`
  },
  {
    title: 'Warung Kita',
    mechanic: 'Cook and serve',
    src: `${DEMO_URL}builds/warung-kita/meta.html`
  }
];

// Mirrors the Networks table in the kit's README.
const networks = [
  { name: 'AppLovin', status: 'supported', output: 'Single HTML', limit: '5 MB' },
  { name: 'Unity Ads', status: 'supported', output: 'Single HTML', limit: '< 5 MB' },
  { name: 'Google', status: 'supported', output: 'ZIP', limit: '5 MB' },
  { name: 'Meta', status: 'supported', output: 'Single HTML', limit: '2 MB' },
  { name: 'Moloco', status: 'testing', output: 'Single HTML', limit: '< 5 MB' },
  { name: 'Liftoff', status: 'testing', output: 'Single HTML', limit: '5 MB' },
  { name: 'Mintegral', status: 'planned', output: 'ZIP', limit: '5 MB' },
  { name: 'TikTok', status: 'planned', output: 'ZIP', limit: '3 MB' }
];

const statusStyles = {
  supported: 'bg-emerald-100 text-emerald-800',
  testing: 'bg-amber-100 text-amber-800',
  planned: 'bg-slate-200 text-slate-700'
};

const statusLegend = [
  {
    status: 'supported',
    text: 'Adapter implemented and tested against a simulated container, following the network’s published requirements.'
  },
  {
    status: 'testing',
    text: 'Implemented, but some requirements could not be confirmed in an official source.'
  },
  { status: 'planned', text: 'Not implemented yet.' }
];

const steps = [
  {
    icon: Send,
    title: 'You send the brief',
    text: 'Your assets, store URLs and a reference for the mechanic you want to show.'
  },
  {
    icon: Wrench,
    title: 'I build the ad',
    text: 'A focused playable around that mechanic, delivered in 5–7 days.'
  },
  {
    icon: Repeat,
    title: 'One round of changes',
    text: 'You review it on the demo and we adjust what needs adjusting.'
  },
  {
    icon: Package,
    title: 'Builds for each network',
    text: 'One upload-ready file per network, checked against its size and format rules.'
  }
];

const packages = [
  {
    name: 'Pilot',
    badge: 'First 3 clients only',
    summary: 'A reduced rate for the first studios that help prove the kit on real campaigns.',
    items: [
      'One playable ad with your core mechanic',
      'Builds for AppLovin, Unity, Google and Meta',
      '1 round of changes',
      'Delivered in 5–7 days'
    ],
    highlighted: true
  },
  {
    name: 'Standard',
    summary: 'A complete playable, ready to test with more than one angle.',
    items: [
      'Every network the kit supports that you need',
      '2 rounds of changes',
      '2 variants',
      'Delivered in 7–10 days'
    ]
  },
  {
    name: 'Variants',
    summary: 'New versions of an ad that already exists.',
    items: ['Copy, colours, difficulty or end card', 'Built on an existing playable', 'Delivered in 1–2 days']
  }
];

const reasons = [
  {
    icon: Layers,
    title: 'A public, open source kit',
    text: 'You can read the code I would build your ad with before you talk to me.',
    href: KIT_URL,
    linkLabel: 'phaser-playable-kit on GitHub'
  },
  {
    icon: Ruler,
    title: 'Checked on every build',
    text: 'A size budget and a static validator run against each network’s published rules, and a headless browser plays every build.'
  },
  {
    icon: Clock,
    title: 'European time zone',
    text: 'CET working hours, so feedback does not wait a day.'
  },
  {
    icon: Languages,
    title: 'Professional English',
    text: 'Clear written communication throughout the project, from the brief to the final builds.'
  }
];

const PlayableAdsPage = ({ isEmailCopied, onCopyEmail, onCardPointerMove }) => (
  <main id="playable-ads">
    <section className="relative z-30 pt-24 lg:pt-28 pb-16 sm:pb-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute -top-40 -left-28 w-[34rem] h-[34rem] rounded-full bg-cyan-500/20 blur-[120px] animate-orbit-slow" />
        <div className="absolute top-1/3 -right-40 w-[38rem] h-[38rem] rounded-full bg-violet-600/20 blur-[140px] animate-orbit-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid xl:grid-cols-[1fr_auto] gap-10 xl:gap-14 items-center">
          <div>
            <p className="hero-stagger text-cyan-300 uppercase tracking-[0.24em] text-xs sm:text-sm font-semibold mb-4">
              Playable ads · Freelance service
            </p>

            <h1
              className="hero-stagger text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[1.02] text-white mb-6"
              style={{ '--i': 1 }}
            >
              Phaser playable ads,
              <span className="block gradient-text">built once and exported for each network.</span>
            </h1>

            <p
              className="hero-stagger text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8"
              style={{ '--i': 2 }}
            >
              I build playable ads for mobile game studios and user acquisition agencies. Both ads
              on this page are real builds: try them.
            </p>

            <div className="hero-stagger flex flex-col sm:flex-row flex-wrap gap-3" style={{ '--i': 3 }}>
              <a
                href="#contact"
                className="press group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 font-semibold hover:bg-cyan-100 transition-all hover:-translate-y-0.5 shadow-xl shadow-black/10"
              >
                Tell me about your game
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={KIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] text-white px-6 py-3.5 font-semibold hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                <Github size={18} />
                The open source kit
              </a>
            </div>
          </div>

          <div>
            <div className="hero-stagger flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-6" style={{ '--i': 2 }}>
              {demos.map((demo) => (
                <figure key={demo.title} className="m-0">
                  <div className="rounded-[2.25rem] border border-white/15 bg-slate-900 p-2 shadow-2xl shadow-cyan-500/10">
                    <div className="w-[270px] h-[540px] rounded-[1.75rem] overflow-hidden bg-black">
                      <iframe
                        title={`${demo.title} playable ad`}
                        src={demo.src}
                        sandbox="allow-scripts"
                        loading="lazy"
                        className="block w-full h-full border-0"
                      />
                    </div>
                  </div>
                  <figcaption className="text-center mt-3">
                    <span className="block text-sm font-semibold text-white">{demo.title}</span>
                    <span className="block text-xs text-slate-400">{demo.mechanic}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="hero-stagger text-center text-xs text-slate-400 mt-4 max-w-[36rem] mx-auto" style={{ '--i': 3 }}>
              The final button stays inactive here: in a campaign, the ad network opens your store page.{' '}
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-semibold"
              >
                Open the full demo
                <ExternalLink size={12} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl mb-10">
          <p className="section-kicker">Networks</p>
          <h2 className="section-title text-slate-900">One ad, one file per network.</h2>
          <p className="text-slate-600 text-lg leading-relaxed mt-5">
            What the kit covers today, with its real status.
          </p>
        </div>

        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {networks.map((network) => (
            <div key={network.name} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="font-bold text-slate-900">{network.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusStyles[network.status]}`}>
                  {network.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">{network.output}</p>
              <p className="text-sm text-slate-600">Limit: {network.limit}</p>
            </div>
          ))}
        </div>

        <div className="reveal grid md:grid-cols-3 gap-4 text-sm text-slate-600">
          {statusLegend.map((entry) => (
            <p key={entry.status}>
              <strong className="text-slate-900 capitalize">{entry.status}:</strong> {entry.text}
            </p>
          ))}
        </div>

        <a
          href={NETWORKS_DOC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          Requirements and sources for each network
          <ExternalLink size={14} />
        </a>
      </div>
    </section>

    <section className="py-20 sm:py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl mb-10">
          <p className="section-kicker text-cyan-300">How I work</p>
          <h2 className="section-title text-white">From your assets to upload-ready files.</h2>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="reveal premium-card rounded-3xl border border-white/10 bg-white/[0.045] p-6 transition-all duration-300"
              onMouseMove={onCardPointerMove}
              style={{ '--reveal-delay': `${index * 80}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.06] text-cyan-300 flex items-center justify-center mb-4">
                <step.icon size={20} />
              </div>
              <h3 className="font-bold text-white mb-2">
                {index + 1}. {step.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="py-20 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl mb-10">
          <p className="section-kicker">Packages</p>
          <h2 className="section-title text-slate-900">Start small, then iterate.</h2>
          <p className="text-slate-600 text-lg leading-relaxed mt-5">
            Pricing depends on the mechanic and your assets, so every quote is private.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {packages.map((item, index) => (
            <article
              key={item.name}
              className={`reveal premium-card rounded-3xl border bg-white p-6 sm:p-7 shadow-sm flex flex-col transition-all duration-300 ${
                item.highlighted ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'
              }`}
              onMouseMove={onCardPointerMove}
              style={{ '--reveal-delay': `${index * 90}ms` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-2xl font-black">{item.name}</h3>
                {item.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">{item.badge}</span>
                )}
              </div>
              <p className="text-slate-600 leading-relaxed mb-5">{item.summary}</p>

              <ul className="space-y-2.5 mb-6">
                {item.items.map((line) => (
                  <li key={line} className="text-sm text-slate-700 flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="press mt-auto inline-flex items-center justify-center gap-2 bg-[#020617] hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-all font-semibold text-sm"
              >
                Contact for quote
                <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl mb-10">
          <p className="section-kicker">Why me</p>
          <h2 className="section-title text-slate-900">What you can check for yourself.</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="reveal premium-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300"
              onMouseMove={onCardPointerMove}
              style={{ '--reveal-delay': `${index * 80}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-[#020617] text-cyan-300 flex items-center justify-center mb-4">
                <reason.icon size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{reason.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{reason.text}</p>
              {reason.href && (
                <a
                  href={reason.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                  {reason.linkLabel}
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="reveal rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <ShieldCheck size={22} className="text-slate-500 shrink-0" />
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-900">Where this stands today:</strong> the kit is at v0.1.0
            and in active development. I have no ads in live campaigns and no conversion data yet.
            The builds have been tested in desktop Chromium with a simulated ad container, not yet on
            physical phones or in the networks’ own preview tools. That is what the pilot projects
            are for.
          </p>
        </div>
      </div>
    </section>

    <section id="contact" className="scroll-mt-32 lg:scroll-mt-20 py-20 sm:py-24 bg-[#020617] relative overflow-hidden">
      <div className="absolute -right-40 bottom-0 w-[32rem] h-[32rem] bg-violet-600/10 rounded-full blur-[130px]" />
      <div className="reveal max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <p className="section-kicker text-cyan-300">Contact</p>
        <h2 className="section-title text-white">Tell me about your game and I’ll suggest a playable concept.</h2>
        <p className="text-slate-400 mt-5 leading-relaxed">
          Based in Mijas (Málaga), Spain. Working remotely with studios and agencies.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 font-semibold hover:bg-cyan-100 transition-all hover:-translate-y-0.5"
          >
            <Linkedin size={18} />
            Message me on LinkedIn
          </a>
          <button
            type="button"
            onClick={onCopyEmail}
            className="press inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] text-white px-6 py-3.5 font-semibold hover:bg-white/10 transition-all hover:-translate-y-0.5"
          >
            {isEmailCopied ? <Check size={18} className="text-emerald-400" /> : <Mail size={18} />}
            <span aria-live="polite">{isEmailCopied ? 'Copied to clipboard' : 'Copy email address'}</span>
            {!isEmailCopied && <Copy size={15} className="text-slate-400" />}
          </button>
        </div>
      </div>
    </section>
  </main>
);

export default PlayableAdsPage;
