// Local fallback question bank — used automatically when Supabase isn't configured yet.
// Same shape as the DB tables, so switching to real Supabase later needs no code changes.

export const MOCK_PASS_PERCENTAGE = 60;

export const MOCK_MCQS = [
  {
    "id": "mock-q1",
    "section": "A",
    "question_text": "You identify a repeated operational problem.",
    "options": [
      {
        "id": "opt1",
        "text": "Document it and propose a practical solution",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Complain to colleagues",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Ignore it",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Tell customers management is poor",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q2",
    "section": "A",
    "question_text": "You miss your monthly target by 40%.",
    "options": [
      {
        "id": "opt1",
        "text": "Review activity, identify causes and create a recovery plan",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Blame the market",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Hide the numbers",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Stop trying",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q3",
    "section": "A",
    "question_text": "You make an error in a patient follow-up.",
    "options": [
      {
        "id": "opt1",
        "text": "Report it appropriately, correct it safely and prevent recurrence",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Hide it",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Blame someone else",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Change the record",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q4",
    "section": "A",
    "question_text": "A colleague performs much better than you.",
    "options": [
      {
        "id": "opt1",
        "text": "Learn from their process and improve your own",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Discredit them",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Stop cooperating",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Assume they cheated",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q5",
    "section": "A",
    "question_text": "A task is due tomorrow and nobody is monitoring you.",
    "options": [
      {
        "id": "opt1",
        "text": "Complete it properly on time",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Wait for a reminder",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Do only part",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Ignore it",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q6",
    "section": "A",
    "question_text": "You were paid an incentive larger than you earned.",
    "options": [
      {
        "id": "opt1",
        "text": "Notify finance/manager and request verification",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Keep it",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Spend it quickly",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Tell friends but not Telth",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q7",
    "section": "A",
    "question_text": "A new Care Manager is struggling.",
    "options": [
      {
        "id": "opt1",
        "text": "Coach them using specific actions and follow-up",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Tell them they are unsuitable",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Criticize publicly",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Ignore them",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q8",
    "section": "A",
    "question_text": "Which best describes good professional goals?",
    "options": [
      {
        "id": "opt1",
        "text": "Specific goals with measurable actions and review",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Goals are unnecessary",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Management decides everything",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Wait for luck",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q9",
    "section": "A",
    "question_text": "A company process appears inefficient.",
    "options": [
      {
        "id": "opt1",
        "text": "Follow safe/lawful procedure while raising evidence-based improvements",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Refuse it",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Tell everyone to ignore it",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Complain publicly",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q10",
    "section": "A",
    "question_text": "A patient complains angrily about a delay you did not cause.",
    "options": [
      {
        "id": "opt1",
        "text": "Listen, establish facts and help resolve/escalate",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Argue",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Ignore",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Send them elsewhere",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q11",
    "section": "B",
    "question_text": "Before recording a vital sign, first verify:",
    "options": [
      {
        "id": "opt1",
        "text": "Patient identity and correct procedure/device readiness",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Sales target",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Social media",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Nothing",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q12",
    "section": "B",
    "question_text": "A BP device gives an unexpectedly extreme reading.",
    "options": [
      {
        "id": "opt1",
        "text": "Recheck per protocol and escalate urgent/abnormal findings",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Diagnose yourself",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Ignore it",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Change the value",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q13",
    "section": "B",
    "question_text": "A patient asks you to change a physician's medicine dose.",
    "options": [
      {
        "id": "opt1",
        "text": "Explain that medication changes require an appropriately licensed clinician and arrange escalation",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Change it",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Ask another patient",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Guess",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q14",
    "section": "B",
    "question_text": "A patient develops severe chest pain and breathing difficulty.",
    "options": [
      {
        "id": "opt1",
        "text": "Follow emergency escalation protocol and seek urgent medical assistance",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Finish sales discussion",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Wait until tomorrow",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Only WhatsApp",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q15",
    "section": "B",
    "question_text": "Why is accurate patient identification important?",
    "options": [
      {
        "id": "opt1",
        "text": "Prevent record/test/follow-up mix-ups",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Only billing",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Optional",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Only doctors need it",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q16",
    "section": "B",
    "question_text": "When using POCT equipment, follow:",
    "options": [
      {
        "id": "opt1",
        "text": "Manufacturer instructions, Telth SOP and applicable protocol",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Whatever is fastest",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "A guess",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Social media",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q17",
    "section": "B",
    "question_text": "A device is damaged or repeatedly errors.",
    "options": [
      {
        "id": "opt1",
        "text": "Remove/flag per procedure and escalate for technical review",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Keep using it",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Hide it",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Change results",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q18",
    "section": "B",
    "question_text": "Patient information should be shared with:",
    "options": [
      {
        "id": "opt1",
        "text": "Authorized persons/systems for legitimate purposes with required consent/legal basis",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Anyone asking",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Friends",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Social media",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q19",
    "section": "B",
    "question_text": "A Care Manager's clinical role is to:",
    "options": [
      {
        "id": "opt1",
        "text": "Work within training/scope and coordinate with licensed clinicians",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Diagnose/prescribe independently",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Do any requested procedure",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Replace specialists",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q20",
    "section": "B",
    "question_text": "After collecting a measurement:",
    "options": [
      {
        "id": "opt1",
        "text": "Record accurately and promptly in the correct record",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Remember later",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Round it to normal",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Delete abnormal values",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q21",
    "section": "C",
    "question_text": "An RPM patient stops transmitting readings.",
    "options": [
      {
        "id": "opt1",
        "text": "Follow defined outreach/escalation workflow and document",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Ignore",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Invent readings",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Cancel",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q22",
    "section": "C",
    "question_text": "Main purpose of a Connected Care Manager:",
    "options": [
      {
        "id": "opt1",
        "text": "Coordinate engagement, data, follow-up and escalation",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Replace physician",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Only sell",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Only collect cash",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q23",
    "section": "C",
    "question_text": "A patient misses a diagnostic appointment.",
    "options": [
      {
        "id": "opt1",
        "text": "Follow up, understand barrier and help reschedule/escalate",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Remove them",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Scold",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Ignore",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q24",
    "section": "C",
    "question_text": "A physician asks for home-monitoring trends.",
    "options": [
      {
        "id": "opt1",
        "text": "Provide accurate authorized data from approved system",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Use memory",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Send another patient's data",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Edit values",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q25",
    "section": "C",
    "question_text": "For an elderly patient living alone:",
    "options": [
      {
        "id": "opt1",
        "text": "Use defined follow-up, adherence support within scope, escalation contacts and safety awareness",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Sell more products",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "No documentation",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Never involve authorized caregivers",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q26",
    "section": "C",
    "question_text": "When handing over a patient:",
    "options": [
      {
        "id": "opt1",
        "text": "Use approved handover with relevant authorized information and pending actions",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Give only name",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Do nothing",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Share publicly",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q27",
    "section": "C",
    "question_text": "A patient refuses a recommended service.",
    "options": [
      {
        "id": "opt1",
        "text": "Respect decision, explain appropriately, document and escalate if clinically necessary",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Force it",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Threaten",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Charge anyway",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q28",
    "section": "C",
    "question_text": "Family requests confidential information but authorization is unclear.",
    "options": [
      {
        "id": "opt1",
        "text": "Verify authorization/consent and follow privacy procedure",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Share all",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Post in group",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Guess",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q29",
    "section": "C",
    "question_text": "Best follow-up method:",
    "options": [
      {
        "id": "opt1",
        "text": "Consistent documented follow-up based on care plan/risk",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Only when selling",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Random",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "None",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q30",
    "section": "C",
    "question_text": "Repeated readings suggest deterioration.",
    "options": [
      {
        "id": "opt1",
        "text": "Follow defined clinical escalation pathway promptly",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Diagnose",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Wait weeks",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Delete readings",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q31",
    "section": "D",
    "question_text": "A prospect says the Care Plan is too expensive.",
    "options": [
      {
        "id": "opt1",
        "text": "Understand need, explain relevant value/terms accurately and allow informed choice",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Pressure them",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Promise unlisted benefits",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Insult competitors",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q32",
    "section": "D",
    "question_text": "Ethical healthcare selling means:",
    "options": [
      {
        "id": "opt1",
        "text": "Match appropriate services to genuine needs with accurate information",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Sell everything",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Hide charges",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Create fear",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q33",
    "section": "D",
    "question_text": "Customer asks if a Care Plan guarantees recovery.",
    "options": [
      {
        "id": "opt1",
        "text": "Explain benefits accurately without guaranteeing clinical outcomes",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Say yes",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Invent statistics",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Avoid",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q34",
    "section": "D",
    "question_text": "Best way to build a territory:",
    "options": [
      {
        "id": "opt1",
        "text": "Systematic partner/community mapping, outreach, follow-up and service quality",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Wait for walk-ins",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Spam",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Copy lists unlawfully",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q35",
    "section": "D",
    "question_text": "A pharmacy sends ten interested customers.",
    "options": [
      {
        "id": "opt1",
        "text": "Use consent-based qualification, needs assessment and follow-up",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Add to unrelated lists",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Ignore",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Promise free treatment",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q36",
    "section": "D",
    "question_text": "Best way to achieve monthly target:",
    "options": [
      {
        "id": "opt1",
        "text": "Track activities/conversion daily and adjust",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Check last day only",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Manipulate reports",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Pressure unsuitable patients",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q37",
    "section": "D",
    "question_text": "Customer says a competitor is cheaper.",
    "options": [
      {
        "id": "opt1",
        "text": "Clarify needs and explain Telth differences/value accurately",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Attack competitor",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Lie",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "End conversation",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q38",
    "section": "D",
    "question_text": "When recommending marketplace/wellness products:",
    "options": [
      {
        "id": "opt1",
        "text": "Prioritize suitability, accurate claims and transparent terms",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Make cure claims",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Hide incentives",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Push unnecessary products",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q39",
    "section": "D",
    "question_text": "A lead is not ready today.",
    "options": [
      {
        "id": "opt1",
        "text": "Set appropriate next step and follow up respectfully",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Call continuously",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Delete immediately",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Threaten expiry",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q40",
    "section": "D",
    "question_text": "Sustainable Care Manager performance is:",
    "options": [
      {
        "id": "opt1",
        "text": "Quality service + retention + compliant growth + reliable collections",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "One day's sales",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Promises made",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Complaints",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q41",
    "section": "E",
    "question_text": "A connected device fails to sync.",
    "options": [
      {
        "id": "opt1",
        "text": "Follow troubleshooting SOP, preserve accurate data and escalate unresolved issues",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Invent data",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Discard device",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Blame patient",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q42",
    "section": "E",
    "question_text": "Unique patient records matter because of:",
    "options": [
      {
        "id": "opt1",
        "text": "Continuity, accuracy and prevention of record mixing",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Only marketing",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "No reason",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Public sharing",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q43",
    "section": "E",
    "question_text": "You accidentally open the wrong patient's record.",
    "options": [
      {
        "id": "opt1",
        "text": "Stop, correct context and follow privacy/incident procedure if required",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Continue",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Copy it",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Delete account",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q44",
    "section": "E",
    "question_text": "Patient asks for report through an unapproved channel.",
    "options": [
      {
        "id": "opt1",
        "text": "Use approved secure communication/consent process",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Always comply",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Group chat",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Screenshot publicly",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q45",
    "section": "E",
    "question_text": "Your login password should be:",
    "options": [
      {
        "id": "opt1",
        "text": "Confidential and protected according to policy",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Shared with team",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Written publicly",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Same for everyone",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q46",
    "section": "F",
    "question_text": "You receive a new territory with few contacts.",
    "options": [
      {
        "id": "opt1",
        "text": "Map partners and create measurable outreach plan",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Wait",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Complain",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Immediately request transfer",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q47",
    "section": "F",
    "question_text": "Telth introduces a device you have never used.",
    "options": [
      {
        "id": "opt1",
        "text": "Complete required training/competency validation first",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Use without training",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Guess",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Refuse to learn",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q48",
    "section": "F",
    "question_text": "Scheduled work finishes early.",
    "options": [
      {
        "id": "opt1",
        "text": "Review follow-ups, documentation and partner development",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Pretend busy",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Leave without process",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Ignore pending work",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q49",
    "section": "F",
    "question_text": "A team member challenges your idea with good evidence.",
    "options": [
      {
        "id": "opt1",
        "text": "Evaluate evidence and change course if appropriate",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Reject it",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Punish them",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Stop speaking",
        "is_correct": false
      }
    ]
  },
  {
    "id": "mock-q50",
    "section": "F",
    "question_text": "Best predictor of long-term growth:",
    "options": [
      {
        "id": "opt1",
        "text": "Continuous learning, measurable goals, accountability and ethical execution",
        "is_correct": true
      },
      {
        "id": "opt2",
        "text": "Blaming circumstances",
        "is_correct": false
      },
      {
        "id": "opt3",
        "text": "Avoiding feedback",
        "is_correct": false
      },
      {
        "id": "opt4",
        "text": "Waiting for promotion",
        "is_correct": false
      }
    ]
  }
] as const;

export const MOCK_WRITTEN = [
  {
    "id": "mock-w1",
    "prompt": "Describe a professional mistake you made, how you corrected it, and what changed afterward."
  },
  {
    "id": "mock-w2",
    "prompt": "How would you build 250 active Care Plan members in a new territory without misleading sales practices?"
  },
  {
    "id": "mock-w3",
    "prompt": "How would you coordinate an elderly member with multiple appointments, medicines and home-monitoring requirements?"
  },
  {
    "id": "mock-w4",
    "prompt": "Describe a difficult customer/patient interaction and how you handled it."
  },
  {
    "id": "mock-w5",
    "prompt": "What are your 12-month professional goals and three measurable actions?"
  },
  {
    "id": "mock-w6",
    "prompt": "Why do you want to become a Telth Care Manager and what do you believe the role is responsible for?"
  }
] as const;
