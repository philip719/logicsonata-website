// Whitepaper-only content that goes beyond the product pages.
// Product basics (capabilities, steps, controls, use cases, FAQ) come from src/lib/products.ts.

export const EXTRA = {
  'knowledge-assistant': {
    summary: [
      'Every company runs on knowledge locked in documents: standard operating procedures, specifications, buyer manuals, policies and reports. Finding the right answer is slow, so employees increasingly paste company documents into public AI tools. That creates a data-control problem most boards have not yet addressed.',
      'A private knowledge assistant solves both problems at once. Staff ask questions in plain language and receive answers drawn only from documents they are allowed to see, each with a citation to the source. The model, the index, the policies and the audit trail all run on hardware the company controls.',
    ],
    takeaways: [
      'Faster, verifiable answers: every response cites the exact source passage.',
      'Access enforced before retrieval: restricted content fails closed and every attempt is logged.',
      'One console for governance: policies, access requests, activity and audit in a Security Center.',
    ],
    challenge: [
      'Knowledge is scattered across shared drives, email and legacy systems, so answers depend on who you know.',
      'Public chatbots are convenient but process prompts and uploads outside company control.',
      'Generic enterprise search ignores permissions nuance and returns documents, not answers.',
      'Without an audit trail, nobody can show auditors or customers how AI is being used.',
    ],
    checklist: [
      'Are permissions enforced before retrieval, or only filtered in the final answer?',
      'Does every answer cite its source, and can users open the passage in one click?',
      'What happens when a user asks about restricted content? Is the attempt recorded?',
      'Can policies be simulated before they go live?',
      'Does the system federate with our existing identity provider?',
      'How are prompt injection and poisoned documents detected?',
      'Where do prompts, documents and logs physically reside?',
      'How are updates signed, tested and rolled back?',
    ],
    metrics: ['Time to answer common SOP and policy questions', 'Share of answers with verified citations', 'Reduction in repeat questions to supervisors and HR', 'Policy denials and access requests handled through the Security Center'],
  },
  'vision-intelligence': {
    summary: [
      'Factories, warehouses and stores already have cameras, but footage is usually reviewed only after something goes wrong. Traditional computer vision can automate some of that review, yet it needs a separately trained model for each question, which puts it out of reach for most mid-sized operations.',
      'Vision-language models change the economics. They understand scenes described in everyday language, so supervisors can ask whether a station is working, whether bundles are queuing or whether a forklift lane is clear, and change the question at any time. Running these models on an appliance on-site keeps video and results inside the business.',
    ],
    takeaways: [
      'One system, many questions: prompts replace custom model training for many use cases.',
      'Video never leaves the premises: analysis and storage happen on your appliance.',
      'Designed for responsible use: focus on processes and safety, with human review of findings.',
    ],
    challenge: [
      'Line imbalance and idle time are hard to see in real time, and manual time studies are infrequent.',
      'Safety and PPE compliance depend on supervisors being in the right place at the right time.',
      'Security teams cannot watch every camera, especially after hours.',
      'Cloud video analytics raise privacy concerns and ongoing bandwidth costs.',
    ],
    checklist: [
      'Can we connect our existing IP cameras, or do we need new hardware?',
      'Where are frames processed and stored, and for how long?',
      'Can supervisors change what the system looks for without retraining a model?',
      'How are findings reviewed before any action is taken?',
      'How does the deployment align with local data protection law and our works council or unions?',
      'What accuracy did the pilot achieve on our own footage?',
      'Who can see live views and history, and is access logged?',
    ],
    metrics: ['Idle and waiting time per station, before and after', 'Bottleneck duration on the target line', 'Safety observations per shift and time to resolution', 'Precision of observations against reviewed footage'],
  },
  'coding-assistant': {
    summary: [
      'AI coding assistants have become one of the clearest productivity wins of generative AI. Developers complete routine code faster, understand unfamiliar systems sooner and write more tests. Most popular assistants, however, send code context to external cloud services.',
      'For companies whose source code embodies their competitive advantage, or whose contracts forbid sharing customer code, that is a blocker. A private coding assistant delivers completion, chat, review and agentic tasks from open-weight coding models running on the company’s own hardware, inside the tools developers already use.',
    ],
    takeaways: [
      'Keep the productivity, remove the exposure: source code never reaches a public model.',
      'Repo-aware help: answers draw on an index of your own repositories, stored on-premise.',
      'Governed adoption: single sign-on, per-team access, usage reporting and audit.',
    ],
    challenge: [
      'Developers already use cloud assistants informally, often without approval.',
      'Legacy systems and ERP customisations are poorly documented and depend on a few experts.',
      'Test coverage lags because writing tests is slow and unrewarding.',
      'Security and legal teams cannot see what code has left the company.',
    ],
    checklist: [
      'Is any code context sent to an external service, even for telemetry?',
      'Which IDEs and workflows are supported, including terminals and code review?',
      'How is the repository index built, stored and permissioned?',
      'Can we choose and change models as open models improve?',
      'Do agentic changes require developer approval?',
      'How is usage measured per team, and is every request auditable?',
    ],
    metrics: ['Suggestion acceptance rate per team', 'Time for new developers to make their first meaningful change', 'Unit test coverage on selected modules', 'Developer satisfaction survey before and after'],
  },
  'agent-platform': {
    summary: [
      'AI agents go beyond answering questions. Open-source agents such as Hermes Agent and OpenClaw can read files, research, draft documents, run scheduled tasks and act across tools, taking instructions from the messaging apps people already use.',
      'That capability is exactly why agents need governance. Logic Sonata deploys them inside a governed runtime: private models on your appliance, sandboxed tools with allow-listed access, credentials held in a vault, human approval for external or irreversible actions and a complete audit trail.',
    ],
    takeaways: [
      'Real work, not just chat: reports, research, drafting and follow-ups handled end to end.',
      'Bounded by design: agents only touch the files, systems and network access each task needs.',
      'People stay in charge: sensitive steps wait for approval and everything is recorded.',
    ],
    challenge: [
      'Teams spend hours each week compiling reports from exports and spreadsheets.',
      'Follow-ups with suppliers and customers fall through the cracks.',
      'Open-source agents are powerful but risky when given broad access or public AI models.',
      'Without logs, nobody can reconstruct what an automated process did or why.',
    ],
    checklist: [
      'Which model powers the agent, and where does it run?',
      'What tools and systems can the agent access, and how is that scoped per task?',
      'Where are credentials stored, and can the model ever see them?',
      'Which actions require human approval, and who approves them?',
      'Can we pause or stop an agent instantly?',
      'Is every plan, tool call and result recorded for review?',
    ],
    metrics: ['Hours saved per week on the first automated reports', 'On-time rate of supplier follow-ups', 'Share of agent actions completed without rework', 'Approval turnaround time'],
  },
  'image-studio': {
    summary: [
      'Generative image tools can take a designer from idea to visual in minutes. For brands and manufacturers, the obstacle is not capability but control: unreleased collections, prints and packaging should not be uploaded to public services with unclear data handling and rights.',
      'A private image studio, built on the open-source ComfyUI engine and delivered as an appliance, gives design teams the same speed on hardware the company owns. Templates make it usable on day one, node workflows give experts full control, and style adapters trained on your own designs keep outputs on-brand.',
    ],
    takeaways: [
      'Speed without leakage: prompts, sketches and outputs never leave your appliance.',
      'Usable by everyone: templates for common jobs, the full node editor for experts.',
      'On-brand and licensed: private style training and curated models suited to commercial use.',
    ],
    challenge: [
      'Sampling and photo shoots make early design exploration slow and expensive.',
      'Designers already use public image tools, risking leaks of unreleased work.',
      'Model licences vary widely, and some prohibit commercial use.',
      'Results from generic tools drift away from the brand’s visual identity.',
    ],
    checklist: [
      'Where are prompts, uploads and outputs stored, and is any telemetry sent externally?',
      'Are the included models licensed for our intended commercial use?',
      'Can we train style adapters on our own designs, on our own hardware?',
      'Are there templates non-technical staff can use without learning node graphs?',
      'How are workflows versioned and shared across the team?',
      'Who can access the studio, and is usage logged?',
    ],
    metrics: ['Time from brief to first visual direction', 'Number of print or concept options explored per brief', 'Physical samples avoided in early rounds', 'Designer adoption and satisfaction'],
  },
};
