import type { IconName } from './site';

// The five Logic Sonata product lines. Product pages, cards, whitepaper
// landing pages and the whitepaper PDFs are all generated from this file.

export type Feature = { title: string; detail: string; icon: IconName };
export type Step = { title: string; detail: string };
export type QA = { q: string; a: string };
export type Visual = { src: string; alt: string; caption: string; width: number; height: number };

export type Spotlight = { eyebrow: string; title: string; lead: string; items: Array<{ label: string; text: string }> };
export type FlowStage = { title: string; detail: string; icon: IconName };

export type Product = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  summary: string;
  icon: IconName;
  heroLead: string;
  highlights: string[];
  problem: { title: string; body: string };
  capabilities: Feature[];
  useCases: Feature[];
  steps: Step[];
  controls: string[];
  builtOn: string;
  visuals: { ui: Visual; photo: Visual };
  spotlight: Spotlight;
  flow: FlowStage[];
  faq: QA[];
  whitepaper: { title: string; subtitle: string; file: string; contents: string[] };
};

export const PRODUCTS: Product[] = [
  {
    id: 'knowledge-assistant',
    code: 'PAI-KB',
    name: 'Private Knowledge Assistant',
    tagline: 'Answers from your own documents. Cited, permissioned and audited.',
    summary:
      'A governed assistant that answers questions from your SOPs, specifications, policies and reports. Every answer cites its source and every user sees only what their role allows.',
    icon: 'book',
    heroLead:
      'Ask a question in plain language and get an answer drawn from your own documents, with a citation to the exact source. Access rules are enforced before anything is retrieved, restricted content fails closed, and every query is recorded in a Security Center your team controls. Nothing leaves your appliance.',
    highlights: ['Cited answers from your documents', 'Role-based, permission-filtered retrieval', 'Security Center with full audit trail'],
    problem: {
      title: 'Your people already ask public chatbots about company documents.',
      body: 'Staff paste SOPs, buyer requirements and costing sheets into public AI tools because finding the right answer internally takes too long. A private knowledge assistant gives them faster answers than a public tool, from sources they can check, without the data ever leaving the business.',
    },
    capabilities: [
      { title: 'Answers with citations', detail: 'Every answer links back to the source document and passage, so users can verify it in one click.', icon: 'book' },
      { title: 'Permission-filtered retrieval', detail: 'Access rules are applied before retrieval and results are re-authorised before display. Restricted content fails closed.', icon: 'lock' },
      { title: 'Single sign-on and roles', detail: 'Federates with your identity provider over OIDC. Roles such as user, manager, auditor and administrator, plus approved temporary access.', icon: 'key' },
      { title: 'Central policy engine', detail: 'Policies are managed in one place, enforced by Open Policy Agent, and can be simulated before they go live.', icon: 'policy' },
      { title: 'Security Center', detail: 'One console for policies, access requests, security events, AI activity, traces, model usage, audit timeline and reports.', icon: 'shield' },
      { title: 'Content defence', detail: 'Detects prompt-injection attempts and poisoned documents before they can influence an answer.', icon: 'eye' },
      { title: 'Multilingual hybrid search', detail: 'Keyword and semantic retrieval combined, qualified for multilingual content across regional teams.', icon: 'translate' },
      { title: 'Controlled egress', detail: 'Outbound traffic passes an approved egress proxy. Prompts, documents and answers stay on the appliance.', icon: 'network' },
      { title: 'Appliance operations', detail: 'Encrypted data at rest, signed offline updates with rollback, backup, restore and health monitoring.', icon: 'support' },
    ],
    useCases: [
      { title: 'Production and quality SOPs', detail: 'Inspection levels, defect standards and line procedures answered on the factory floor.', icon: 'factory' },
      { title: 'Technical design and tech packs', detail: 'Construction details, measurement specs and material requirements in seconds.', icon: 'pen' },
      { title: 'Buyer requirements and compliance', detail: 'Customer manuals, testing protocols and compliance rules, with the exact clause cited.', icon: 'policy' },
      { title: 'HR handbook and onboarding', detail: 'Staff get policy answers any time; payroll and personal data stay restricted.', icon: 'users' },
      { title: 'Sales and customer service', detail: 'Product knowledge and order procedures for faster, consistent responses.', icon: 'store' },
      { title: 'Management content, locked down', detail: 'Finance, payroll and board material available only to authorised roles, and every attempt logged.', icon: 'lock' },
    ],
    steps: [
      { title: 'Connect and classify', detail: 'Documents are ingested through a secure conversion pipeline and tagged with owner, folder, classification and lifecycle.' },
      { title: 'Index privately', detail: 'A hybrid keyword and vector index is built on the appliance. Nothing is sent to an external service.' },
      { title: 'Ask in a familiar chat', detail: 'Users sign in with single sign-on and ask questions in a clean chat interface, in their own language.' },
      { title: 'Check every request', detail: 'The policy engine evaluates the user, role and content before retrieval, and again before results are shown.' },
      { title: 'Answer with sources', detail: 'The model answers only from permitted passages and cites each source.' },
      { title: 'Audit and observe', detail: 'Every request, denial and model call is traceable in the Security Center.' },
    ],
    controls: [
      'Role-based access with fail-closed denial for restricted folders',
      'Result re-authorisation and cache isolation between users',
      'Prompt-injection and poisoned-content defence',
      'Signed model catalogue: only approved models can run',
      'Approved egress proxy and hardened containers',
      'Encrypted storage, signed updates and tested recovery',
    ],
    builtOn:
      'Open WebUI for the chat experience, open-weight language models served on the appliance, Open Policy Agent for policy decisions, OIDC single sign-on, and self-hosted Langfuse for observability, all wrapped in a Logic Sonata governed gateway and Security Center.',
    visuals: {
      ui: {
        src: '/images/products/kb-ui.webp',
        alt: 'Private Knowledge Assistant chat answering a quality inspection question with cited source documents, next to a denied request for payroll data',
        caption: 'Cited answers for permitted content; restricted requests are denied and logged.',
        width: 1600,
        height: 1000,
      },
      photo: {
        src: '/images/products/kb-security.webp',
        alt: 'Security Center console showing policies, access requests, AI activity and audit timeline',
        caption: 'The Security Center: policies, access, activity and audit in one place.',
        width: 1600,
        height: 1000,
      },
    },
    spotlight: {
      eyebrow: 'See it working',
      title: 'Inside the apparel demo.',
      lead: 'Our live demonstration runs a fictional apparel manufacturer with production, quality, technical design, sales, HR, finance and executive teams. The same question gets a different, correct answer depending on who asks.',
      items: [
        { label: 'Standard user', text: 'Gets cited answers from production, quality, technical and sales documents and the staff handbook. Payroll, budgets and board strategy are denied and the attempt is logged.' },
        { label: 'Manager', text: 'Sees everything a standard user sees. Restricted HR, finance and executive content stays denied unless access is explicitly delegated.' },
        { label: 'Administrator', text: 'Governs policies, access requests and temporary access in the Security Center, with every change recorded on the audit timeline.' },
        { label: 'Auditor', text: 'Reviews AI activity, traces, denials and reports without being able to change policy.' },
      ],
    },
    flow: [
      { title: 'Sign in', detail: 'Single sign-on, role assigned', icon: 'key' },
      { title: 'Policy check', detail: 'Open Policy Agent decides', icon: 'policy' },
      { title: 'Governed retrieval', detail: 'Permission-filtered search', icon: 'database' },
      { title: 'Private model', detail: 'Answers on the appliance', icon: 'chip' },
      { title: 'Cited answer', detail: 'Sources, audit, trace', icon: 'book' },
    ],
    faq: [
      { q: 'Can users see documents they are not allowed to?', a: 'No. Permissions are checked before retrieval and again before results are displayed. If a user asks about restricted content, the request is denied and recorded.' },
      { q: 'Does it work with our existing sign-in?', a: 'Yes. The assistant federates with your identity provider over OIDC, so staff use the accounts they already have.' },
      { q: 'Which document types are supported?', a: 'Common office formats such as PDF, Word, Excel, PowerPoint and text are converted through a secure ingestion pipeline. We confirm your specific formats during the assessment.' },
    ],
    whitepaper: {
      title: 'Private Knowledge Assistants',
      subtitle: 'Cited, permissioned and audited answers from your own documents',
      file: '/whitepapers/files/logic-sonata-private-knowledge-assistant.pdf',
      contents: ['Why public chatbots create data risk', 'How governed retrieval works', 'Security Center and audit', 'Use cases and rollout plan'],
    },
  },
  {
    id: 'vision-intelligence',
    code: 'PAI-VISION',
    name: 'Private Vision Intelligence',
    tagline: 'Your cameras, understood in plain language. On-site.',
    summary:
      'Real-time analysis of live camera feeds by a vision-language model on your appliance. Ask what is happening on a line, at a dock or at an entrance, without video leaving your premises.',
    icon: 'eye',
    heroLead:
      'Connect a webcam or an existing IP camera, describe what you want to know in plain language, and a vision-language model running on your appliance analyses the live feed in real time. Spot idle time on a production line, unsafe behaviour or activity after hours, without training a custom model and without sending a single frame to the cloud.',
    highlights: ['Live analysis of webcams and IP cameras', 'Plain-language prompts, no model training', 'Video never leaves your site'],
    problem: {
      title: 'Cameras record everything. Almost nobody watches.',
      body: 'Factories, warehouses and stores already have cameras, but footage is only reviewed after something goes wrong. Traditional computer vision needs a custom model for every question. A vision-language model understands scenes described in everyday language, so one system can answer many operational questions, live.',
    },
    capabilities: [
      { title: 'Plain-language prompts', detail: 'Describe what to look for in a sentence. Change the question at any time without retraining a model.', icon: 'translate' },
      { title: 'Live camera streams', detail: 'Browser webcams over WebRTC and IP cameras over RTSP feed the model continuously.', icon: 'eye' },
      { title: 'Runs on your appliance', detail: 'Open vision-language models are served locally, so video and results stay on-site.', icon: 'chip' },
      { title: 'Real-time responses', detail: 'Observations stream back within seconds, with latency and GPU utilisation shown alongside.', icon: 'wave' },
      { title: 'Structured events', detail: 'Findings can be logged, summarised by shift and pushed to dashboards or alerts.', icon: 'database' },
      { title: 'Human review', detail: 'Observations are indicators for supervisors to review, not automated decisions about people.', icon: 'users' },
    ],
    useCases: [
      { title: 'Time and motion on the line', detail: 'Detect idle stations, waiting for materials and unnecessary movement to balance lines and remove bottlenecks.', icon: 'factory' },
      { title: 'Quality spot checks', detail: 'A second pair of eyes for visible defects such as stains, broken stitches or shade variation.', icon: 'search' },
      { title: 'Safety and PPE', detail: 'Flag missing helmets or vests, blocked exits and people too close to moving equipment.', icon: 'shield' },
      { title: 'Security monitoring', detail: 'Activity after hours, loitering near restricted doors and unattended items, described in plain language.', icon: 'lock' },
      { title: 'Warehouse and logistics', detail: 'Dock occupancy, loading progress and unsafe pallet stacking, shift by shift.', icon: 'truck' },
      { title: 'Retail operations', detail: 'Queue length, empty shelves and fitting-room waits, so staff go where they are needed.', icon: 'store' },
    ],
    steps: [
      { title: 'Connect cameras', detail: 'Add webcams or existing IP cameras. No new camera hardware is needed for most sites.' },
      { title: 'Describe what matters', detail: 'Write prompts such as "Is the operator at station 4 working, waiting or away?"' },
      { title: 'Analyse live on-site', detail: 'The appliance samples frames continuously and a vision-language model interprets each scene.' },
      { title: 'Act on the findings', detail: 'Supervisors see live observations and shift summaries, and receive alerts for agreed events.' },
      { title: 'Refine and extend', detail: 'Adjust prompts, add cameras and new questions as your team learns what is useful.' },
    ],
    controls: [
      'Video and results processed and stored on-site only',
      'Configurable retention, with no footage kept by default',
      'Focus on processes and safety, not individual scoring',
      'Access to live views and history limited by role',
      'Deployment guidance aligned with local data protection laws',
      'Signage and worker consultation recommended before go-live',
    ],
    builtOn:
      'NVIDIA Live VLM WebUI, an open-source real-time interface for vision-language models, with open models served on the appliance. Logic Sonata adds camera integration, prompt design, event logging, dashboards and governance.',
    visuals: {
      ui: {
        src: '/images/products/vision-ui.webp',
        alt: 'Live vision dashboard showing a production line camera feed with station status and real-time observations from the vision model',
        caption: 'Live observations, station status and shift timeline, generated on-site.',
        width: 1600,
        height: 1000,
      },
      photo: {
        src: '/images/products/vision-floor.webp',
        alt: 'Illustration of a garment production floor with camera coverage over sewing stations',
        caption: 'Existing cameras over a production floor become a live source of operational insight.',
        width: 1600,
        height: 1000,
      },
    },
    spotlight: {
      eyebrow: 'Time and motion, in plain language',
      title: 'Ask the line what is happening.',
      lead: 'Instead of training a model per question, supervisors describe what they care about. The model answers continuously, and results roll up into shift summaries.',
      items: [
        { label: 'Prompt', text: 'Is the operator at station 4 sewing, waiting for work or away from the station?' },
        { label: 'Prompt', text: 'Are bundles piling up between stations 3 and 4? Describe the queue.' },
        { label: 'Prompt', text: 'Is anyone in the marked forklift lane without a high-visibility vest?' },
        { label: 'Prompt', text: 'After 22:00, report any person or vehicle near the loading bay door.' },
      ],
    },
    flow: [
      { title: 'Cameras', detail: 'Webcam or IP camera (RTSP)', icon: 'eye' },
      { title: 'Frame sampling', detail: 'Continuous, on-site', icon: 'wave' },
      { title: 'Vision-language model', detail: 'Runs on the appliance', icon: 'chip' },
      { title: 'Observations', detail: 'Structured events', icon: 'database' },
      { title: 'Supervisors', detail: 'Dashboards and alerts', icon: 'users' },
    ],
    faq: [
      { q: 'Do we need new cameras?', a: 'Usually not. Webcams and most IP cameras that provide an RTSP stream can be connected. We check your cameras during the assessment.' },
      { q: 'Is this employee surveillance?', a: 'The system is designed to improve processes, safety and security. We recommend focusing prompts on stations and events rather than individuals, informing staff, and following local data protection law. Findings are for human review.' },
      { q: 'How accurate is it?', a: 'Vision-language models are strong at describing scenes but can make mistakes, so observations are treated as indicators. We tune prompts and camera placement during the pilot and measure accuracy against real footage.' },
    ],
    whitepaper: {
      title: 'Vision AI on Your Own Cameras',
      subtitle: 'Real-time operational insight without sending video to the cloud',
      file: '/whitepapers/files/logic-sonata-private-vision-intelligence.pdf',
      contents: ['What vision-language models change', 'Time and motion, safety and security use cases', 'Privacy and responsible deployment', 'Pilot plan'],
    },
  },
  {
    id: 'coding-assistant',
    code: 'PAI-CODE',
    name: 'Private Coding Assistant',
    tagline: 'AI pair programming that keeps your source code in-house.',
    summary:
      'Code completion, repo-aware chat, review and agentic coding in the tools your developers already use, powered by open coding models on your own hardware.',
    icon: 'code',
    heroLead:
      'Give your developers the productivity of an AI coding assistant without sending a line of source code outside the company. Completion, chat, code review and agentic tasks run inside VS Code, JetBrains IDEs and the terminal, powered by open-weight coding models on your appliance and governed by your own access rules.',
    highlights: ['Completion, chat and review in the IDE', 'Repo-aware answers from your own code', 'Source code never reaches a public model'],
    problem: {
      title: 'Source code is your most valuable, least protected asset.',
      body: 'Cloud coding assistants send code context to external servers. For proprietary systems, integrations and customer projects, that is often not acceptable. A private coding assistant keeps the benefit and removes the exposure.',
    },
    capabilities: [
      { title: 'Inline completion', detail: 'Context-aware suggestions as developers type, in the editor they already use.', icon: 'code' },
      { title: 'Repo-aware chat', detail: 'Ask how a module works or where a function is used. Answers draw on an index of your own repositories.', icon: 'search' },
      { title: 'Code review and summaries', detail: 'Explain changes, suggest improvements and draft pull-request descriptions.', icon: 'check' },
      { title: 'Tests and documentation', detail: 'Generate unit tests, docstrings and README updates for existing code.', icon: 'book' },
      { title: 'Agentic tasks with approval', detail: 'Multi-step changes planned and executed in the IDE or terminal, with a developer approving each step.', icon: 'agent' },
      { title: 'Governed access', detail: 'Single sign-on, per-team model access, usage reporting and a full audit trail.', icon: 'key' },
    ],
    useCases: [
      { title: 'Onboarding to large codebases', detail: 'New developers ask questions of the code instead of waiting for a senior engineer.', icon: 'users' },
      { title: 'Legacy modernisation', detail: 'Understand, document and refactor older systems and ERP customisations safely.', icon: 'layers' },
      { title: 'ERP, MES and integration work', detail: 'Faster development of connectors and internal tools around core business systems.', icon: 'network' },
      { title: 'Test coverage', detail: 'Raise coverage on critical modules without slowing delivery.', icon: 'flask' },
      { title: 'Secure code review', detail: 'Spot risky patterns before they reach production, on-premise.', icon: 'shield' },
      { title: 'Documentation that stays current', detail: 'Generate and refresh technical documentation from the code itself.', icon: 'book' },
    ],
    steps: [
      { title: 'Install the IDE extension', detail: 'Open-source extensions for VS Code and JetBrains, or a terminal client, point at your private endpoint.' },
      { title: 'Sign in', detail: 'Developers authenticate with single sign-on; access follows team and project rules.' },
      { title: 'Index your repositories', detail: 'Selected repositories are indexed on the appliance for repo-aware answers.' },
      { title: 'Code with AI', detail: 'Completion, chat, review and agentic tasks are served by coding models on your hardware.' },
      { title: 'Measure and govern', detail: 'Usage and adoption are reported per team, with every request auditable.' },
    ],
    controls: [
      'Code and prompts processed only on your infrastructure',
      'Repository index stored on the appliance',
      'Per-team access to models and repositories',
      'Agentic actions require developer approval',
      'Full audit trail of requests',
      'Model choice without vendor lock-in',
    ],
    builtOn:
      'Open-weight coding models served through a private, OpenAI-compatible gateway, with open-source IDE extensions such as Continue and Cline for VS Code and JetBrains, plus terminal clients for agentic work.',
    visuals: {
      ui: {
        src: '/images/products/code-ui.webp',
        alt: 'Code editor with an inline AI suggestion and a chat panel explaining a function using references from the repository',
        caption: 'Inline suggestions and repo-aware chat, served by models on your appliance.',
        width: 1600,
        height: 1000,
      },
      photo: {
        src: '/images/products/code-flow.webp',
        alt: 'Diagram of developer tools connecting through a private gateway to coding models and a repository index on the appliance',
        caption: 'Every request stays inside your network, from IDE to model and back.',
        width: 1600,
        height: 1000,
      },
    },
    spotlight: {
      eyebrow: 'A day with the assistant',
      title: 'What developers actually ask it.',
      lead: 'The assistant is most valuable on your own code, where public tools cannot safely go.',
      items: [
        { label: 'Explain', text: 'Walk me through how the order allocation service reserves stock, and where it can fail.' },
        { label: 'Test', text: 'Write unit tests for the costing module, covering currency rounding edge cases.' },
        { label: 'Review', text: 'Review this pull request for security issues and summarise the change for the release notes.' },
        { label: 'Modernise', text: 'Document this legacy ERP customisation and propose a refactor into smaller functions.' },
      ],
    },
    flow: [
      { title: 'IDE and terminal', detail: 'VS Code, JetBrains, CLI', icon: 'code' },
      { title: 'Private gateway', detail: 'SSO, policy, audit', icon: 'key' },
      { title: 'Repository index', detail: 'Stays on-premise', icon: 'database' },
      { title: 'Coding model', detail: 'Served on the appliance', icon: 'chip' },
      { title: 'Suggestion', detail: 'Developer reviews and accepts', icon: 'check' },
    ],
    faq: [
      { q: 'How does it compare with cloud coding assistants?', a: 'For everyday completion, explanation and test writing, current open coding models perform well. The difference is control: your code never leaves the company. We benchmark against your own tasks during the pilot.' },
      { q: 'Which IDEs are supported?', a: 'VS Code and JetBrains IDEs through open-source extensions, plus terminal-based clients for agentic workflows.' },
      { q: 'Can we choose the model?', a: 'Yes. The platform is model-independent, so we select coding models to suit your languages, hardware and licence requirements, and can change them later.' },
    ],
    whitepaper: {
      title: 'Private AI Coding Assistants',
      subtitle: 'Developer productivity without exposing your source code',
      file: '/whitepapers/files/logic-sonata-private-coding-assistant.pdf',
      contents: ['The hidden cost of cloud coding tools', 'Architecture of a private assistant', 'Governance and measurement', 'Rollout plan for engineering teams'],
    },
  },
  {
    id: 'agent-platform',
    code: 'PAI-AGENT',
    name: 'Private AI Agent Platform',
    tagline: 'Agents that get work done inside your walls, with you in control.',
    summary:
      'Self-hosted AI agents built on Hermes Agent or OpenClaw that research, write and act across your tools, running on private models inside a sandbox with approval for anything that matters.',
    icon: 'agent',
    heroLead:
      'Hand routine work to AI agents that run on your own infrastructure. Built on the open-source Hermes Agent or OpenClaw, they take requests from the messaging apps your team already uses, remember context, learn reusable skills and run scheduled tasks. Logic Sonata wraps them in a governed sandbox: private models, allow-listed tools, human approval for sensitive actions and a complete audit trail.',
    highlights: ['Built on Hermes Agent or OpenClaw', 'Private models, sandboxed tools', 'Human approval and full audit trail'],
    problem: {
      title: 'Agents are powerful. Ungoverned agents are a risk.',
      body: 'Open-source agents can read files, browse the web, run commands and send messages. That is exactly what makes them useful and exactly why they must not run with unchecked access to company systems or public AI services. The value comes from pairing capable agents with strict governance.',
    },
    capabilities: [
      { title: 'Work from chat', detail: 'Ask the agent in messaging apps such as Telegram, WhatsApp, Slack or Discord, or from a web console.', icon: 'agent' },
      { title: 'Memory and skills', detail: 'Agents remember context across sessions and turn solved problems into reusable, readable skills.', icon: 'book' },
      { title: 'Scheduled tasks', detail: 'Daily reports, weekly summaries and recurring checks, described in plain language.', icon: 'rocket' },
      { title: 'Sandboxed tools', detail: 'Files, spreadsheets, browser and scripts run in an isolated environment with allow-listed access.', icon: 'lock' },
      { title: 'Human approval', detail: 'Sending email, updating records or spending money waits for a named approver.', icon: 'users' },
      { title: 'Full audit trail', detail: 'Every plan, tool call, approval and result is recorded and reviewable.', icon: 'policy' },
    ],
    useCases: [
      { title: 'Daily production and sales reports', detail: 'Pull exports from ERP or MES, calculate KPIs and deliver a summary before the morning meeting.', icon: 'factory' },
      { title: 'RFQ and tender preparation', detail: 'Collect specifications, past quotes and requirements into a first draft for review.', icon: 'policy' },
      { title: 'Supplier follow-ups', detail: 'Track open purchase orders and draft chasers for approval.', icon: 'truck' },
      { title: 'Inbox and document triage', detail: 'Classify incoming requests, extract key data and route them to the right team.', icon: 'search' },
      { title: 'Meeting notes and actions', detail: 'Summaries, decisions and owners, posted back to the team channel.', icon: 'users' },
      { title: 'Market and competitor watch', detail: 'Research through approved sources, summarised weekly.', icon: 'globe' },
    ],
    steps: [
      { title: 'Trigger', detail: 'A message, a schedule or an event starts a task.' },
      { title: 'Plan', detail: 'The agent breaks the task into steps using a private model on the appliance.' },
      { title: 'Act in the sandbox', detail: 'Approved tools run in isolation with only the access that task needs.' },
      { title: 'Ask before it matters', detail: 'Sensitive steps pause for human approval in chat or the console.' },
      { title: 'Deliver and learn', detail: 'Results are delivered, logged and captured as reusable skills.' },
    ],
    controls: [
      'Agents run on private models, never public AI services',
      'Isolated sandbox with allow-listed tools and network access',
      'Credentials held in a vault, never exposed to the model',
      'Approval gates for external and irreversible actions',
      'Complete, reviewable audit trail',
      'Instant pause and kill switch',
    ],
    builtOn:
      'Hermes Agent from Nous Research or OpenClaw, both open-source, self-hosted agent frameworks with memory, skills, scheduling and messaging integrations. Logic Sonata selects the framework per use case and adds the governed runtime.',
    visuals: {
      ui: {
        src: '/images/products/agent-ui.webp',
        alt: 'Chat conversation in which an AI agent prepares a daily production report and asks for approval before sending an email',
        caption: 'The agent plans, works in its sandbox and asks before sending anything out.',
        width: 1600,
        height: 1000,
      },
      photo: {
        src: '/images/products/agent-flow.webp',
        alt: 'Diagram of the governed agent loop: trigger, plan, sandboxed tools, human approval, deliver and audit',
        caption: 'The governed agent loop: every step bounded, approved and recorded.',
        width: 1600,
        height: 1000,
      },
    },
    spotlight: {
      eyebrow: 'Example skills',
      title: 'Work your agents can take on.',
      lead: 'Skills are readable, reusable instructions the agent builds and improves. These are typical first skills for manufacturing and trading companies.',
      items: [
        { label: 'Every morning', text: 'Read yesterday’s production export, calculate output, efficiency and defects by line, and post a summary to the operations channel.' },
        { label: 'On request', text: 'Collect the buyer’s tech pack, past quotations and material prices into a first-draft RFQ response for review.' },
        { label: 'Every Friday', text: 'List purchase orders overdue by more than three days and draft supplier reminders for approval.' },
        { label: 'After meetings', text: 'Summarise the notes, extract decisions and owners, and post them back to the team.' },
      ],
    },
    flow: [
      { title: 'Trigger', detail: 'Chat, schedule or event', icon: 'wave' },
      { title: 'Plan', detail: 'Private model on the appliance', icon: 'chip' },
      { title: 'Sandboxed tools', detail: 'Allow-listed access only', icon: 'lock' },
      { title: 'Approval', detail: 'Human signs off', icon: 'users' },
      { title: 'Deliver and audit', detail: 'Result, log, new skill', icon: 'policy' },
    ],
    faq: [
      { q: 'Hermes Agent or OpenClaw: which do we get?', a: 'Both are capable open-source agents. We recommend one based on your channels, tasks and security requirements, and deploy it inside the same governed runtime.' },
      { q: 'Can an agent act without permission?', a: 'Only within the limits you set. Read-only and internal steps can run automatically; anything external or irreversible waits for approval.' },
      { q: 'Which systems can agents connect to?', a: 'Files, spreadsheets, email, messaging apps and business systems with an API or export. Each connection is allow-listed and scoped.' },
    ],
    whitepaper: {
      title: 'Governed AI Agents',
      subtitle: 'Putting Hermes Agent and OpenClaw to work safely inside your business',
      file: '/whitepapers/files/logic-sonata-private-ai-agent-platform.pdf',
      contents: ['What modern agents can do', 'Risks of ungoverned agents', 'The governed runtime', 'First use cases and rollout'],
    },
  },
  {
    id: 'image-studio',
    code: 'PAI-IMG',
    name: 'Private Image Generation Studio',
    tagline: 'ComfyUI in a box: a private design studio for on-brand imagery.',
    summary:
      'A ready-to-use image generation studio built on ComfyUI, preinstalled with curated models and templates, so designers create prints, concepts and campaign visuals without their work leaving the building.',
    icon: 'image',
    heroLead:
      'Your own generative design studio, delivered as an appliance. Built on ComfyUI, the open-source node-based workflow engine, and preloaded with curated models and ready-made templates, it lets designers turn sketches, references and prompts into prints, product concepts and campaign visuals, while your designs and your brand stay private.',
    highlights: ['ComfyUI preinstalled and configured', 'Templates for non-technical users', 'Designs never train a public model'],
    problem: {
      title: 'Your designs are your IP. Public image tools are not the place for them.',
      body: 'Uploading unreleased collections, prints or packaging to public image generators risks leaks and unclear rights. Designers still want the speed of generative tools. A private studio gives them that speed on hardware you own.',
    },
    capabilities: [
      { title: 'Node-based workflows', detail: 'Full creative control with ComfyUI graphs for power users and technical artists.', icon: 'network' },
      { title: 'One-click templates', detail: 'Prepared workflows for common jobs, so non-technical staff get results without touching nodes.', icon: 'grid' },
      { title: 'Sketch and reference control', detail: 'Turn line sketches, mood images and existing products into guided renders.', icon: 'pen' },
      { title: 'Your brand, trained privately', detail: 'Fine-tune style adapters on your own designs, on your own hardware.', icon: 'lock' },
      { title: 'Edit, extend and upscale', detail: 'Inpainting, background replacement, variations and high-resolution upscaling.', icon: 'image' },
      { title: 'Curated, licensed models', detail: 'Models selected for quality and licence terms that suit commercial use.', icon: 'check' },
    ],
    useCases: [
      { title: 'Textile prints and colourways', detail: 'Explore print directions and recolour them in minutes before sampling.', icon: 'pen' },
      { title: 'Product and packaging concepts', detail: 'Visualise new products and packs early, without a photo shoot.', icon: 'store' },
      { title: 'Lookbooks and campaigns', detail: 'On-brand imagery for seasonal launches and social content.', icon: 'image' },
      { title: 'E-commerce variants', detail: 'Consistent backgrounds, colour variants and lifestyle scenes at scale.', icon: 'grid' },
      { title: 'Mood boards', detail: 'Rapid visual directions for buyers and internal reviews.', icon: 'layers' },
      { title: 'Buyer presentations', detail: 'Show customers options quickly, from your own secure studio.', icon: 'users' },
    ],
    steps: [
      { title: 'Choose a template or workflow', detail: 'Start from a prepared template or open the full ComfyUI canvas.' },
      { title: 'Add prompt, sketch or reference', detail: 'Describe the result, upload a sketch or point to a reference image.' },
      { title: 'Generate on the appliance', detail: 'Images render locally on your GPU, typically in seconds.' },
      { title: 'Refine', detail: 'Iterate with variations, edits and upscaling until it is right.' },
      { title: 'Export', detail: 'Download to your design tools or share with your team.' },
    ],
    controls: [
      'Prompts, uploads and outputs stay on your appliance',
      'Style adapters trained on your hardware only',
      'Model licences reviewed for your intended use',
      'User accounts and access control',
      'Version-controlled workflows and templates',
      'No telemetry to external services',
    ],
    builtOn:
      'ComfyUI, the open-source node-based engine for image and video generation, with curated open models and Logic Sonata templates, configured and supported on your appliance.',
    visuals: {
      ui: {
        src: '/images/products/img-ui.webp',
        alt: 'Node-based image generation workflow with prompt, sketch control and sampler nodes producing textile print designs',
        caption: 'A ComfyUI-style workflow turning a sketch and a prompt into print options.',
        width: 1600,
        height: 1000,
      },
      photo: {
        src: '/images/products/img-prints.webp',
        alt: 'Fabric swatches draped side by side showing generated textile print designs',
        caption: 'Illustrative outputs: print directions explored before a single sample is made.',
        width: 1600,
        height: 1000,
      },
    },
    spotlight: {
      eyebrow: 'Ready-made templates',
      title: 'Templates your designers use on day one.',
      lead: 'Each template is a tested ComfyUI workflow wrapped in a simple form, so the team gets consistent results without learning the node editor.',
      items: [
        { label: 'Print explorer', text: 'Prompt plus mood image to a grid of textile print directions, ready for colourways.' },
        { label: 'Sketch to render', text: 'A line sketch of a garment or product becomes a photoreal concept render.' },
        { label: 'Colourway generator', text: 'Recolour an approved design into seasonal palettes while keeping the pattern intact.' },
        { label: 'Product on background', text: 'Place a product photo into clean studio or lifestyle scenes for e-commerce.' },
      ],
    },
    flow: [
      { title: 'Designer', detail: 'Template or node canvas', icon: 'pen' },
      { title: 'Prompt and references', detail: 'Text, sketch, mood image', icon: 'image' },
      { title: 'ComfyUI engine', detail: 'Workflow on the appliance', icon: 'network' },
      { title: 'Curated models', detail: 'Plus your brand adapters', icon: 'chip' },
      { title: 'Outputs', detail: 'Export to design tools', icon: 'grid' },
    ],
    faq: [
      { q: 'Do designers need to learn ComfyUI?', a: 'No. Templates cover common jobs with a simple form. Technical artists can open the full node editor when they want more control.' },
      { q: 'Can it learn our brand style?', a: 'Yes. We can train style adapters on your approved designs, on your hardware, so outputs stay consistent with your brand.' },
      { q: 'Who owns the images?', a: 'You control everything the studio produces. We select models whose licences suit commercial use and review terms with you.' },
    ],
    whitepaper: {
      title: 'ComfyUI in a Box',
      subtitle: 'Private generative design for brands and manufacturers',
      file: '/whitepapers/files/logic-sonata-private-image-generation-studio.pdf',
      contents: ['Why designers need a private studio', 'How ComfyUI workflows work', 'Brand training and licensing', 'Studio rollout plan'],
    },
  },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
