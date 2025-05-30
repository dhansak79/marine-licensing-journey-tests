# Test Charters - Investigative Testing Plans

This section contains **investigative testing charters** for marine licensing user stories. Each charter provides structured guidance for **60-90 minute investigation sessions** that combine systematic exploration with realistic user scenarios.

> **🔗 Powered by investigative testing**  
> These charters implement the **[investigative testing](../test-strategy/investigative-testing.md)** approach - combining session-based structure with rich scenario content and systematic heuristics.

## 🧠 Charter purpose

Test charters bridge the gap between:

- **User story requirements** - What the feature should do
- **Systematic investigation** - How we discover what it actually does through realistic scenarios
- **Real user needs** - Whether it serves marine licensing personas effectively
- **Evidence collection** - Actionable insights for development teams

## 📋 Available investigation sessions

| Theme                           | Charter name                                | Focus                                                    | Personas | Priority | Status   |
| ------------------------------- | ------------------------------------------- | -------------------------------------------------------- | -------- | -------- | -------- |
| **First-time user experience**  | [Novice journey](./novice-journey.md)       | Complete application flow for marine licensing newcomers | Zofia    | High     | 🔄 Ready |
| **Veteran user efficiency**     | [Expert workflows](./expert-workflows.md)   | Speed, shortcuts, and professional patterns              | Amy      | High     | 🔄 Ready |
| **Form behaviour & validation** | [Form interactions](./form-interactions.md) | Input validation, error handling, conditional logic      | All      | High     | 🔄 Ready |
| **Spatial data entry**          | [Site details](./site-details.md)           | Coordinate system selection and location data entry      | All      | High     | 🔄 Ready |

### **Charter lifecycle**

**Charters are refreshed on every release** to ensure they remain aligned with current system functionality:

- **New features** → New charters created to investigate user experience and integration
- **Changed features** → Existing charters updated to reflect new behaviour and workflows
- **Removed features** → Obsolete charters archived to maintain focus on delivered functionality
- **User feedback** → Charter priorities and focus areas adjusted based on real user insights

This approach ensures our investigation sessions always target the **actual delivered system** rather than outdated assumptions about functionality.

## 🏗️ Charter structure

All charters follow the **investigative testing framework**:

```
EXPLORE: [Area of application or workflow]
AS: [Type of user - MMO staff, applicant, etc.]
BECAUSE: [What you're concerned about or want to validate]
LOOKING FOR: [Types of problems or insights you hope to find]

SCENARIO CONTEXT:
THEME: [Rich user context - what authentic situation are we investigating?]
SETUP: [Realistic pressures, friction, and environment]
PERSONA: [Which marine licensing user type - Zofia, Amy, Fatima, Simon]

REALISTIC ACTIVITIES:
- [Guided but flexible actions following authentic user patterns]
- [Include friction, interruptions, and real-world behaviour]
- [Test edge cases and stress conditions]

EVIDENCE FRAMEWORK:
+ Things that worked well
- Problems discovered
? Questions raised
! Ideas for improvement

Duration: 60-90 minutes
Priority: [High/Medium/Low based on risk and user impact]
```

## 🚀 Using test charters

### **Charter execution (60-90 minutes)**

```
📋 Setup (10 minutes)
├── Pick area to explore
├── Choose realistic user context
└── Decide what questions to answer

🔍 Exploration (45-70 minutes)
├── Follow realistic user workflows
├── Try variations and edge cases
├── Note anything odd, slow, or confusing
└── Test scenarios automation might miss

📝 Wrap-up (5-10 minutes)
├── Document key findings
├── Identify follow-up actions
└── Share insights with team
```

### **After completion**

1. **Summarise key discoveries** - Include both technical and user experience insights
2. **Create actionable reports** - Link findings to specific user impact and business risk
3. **Identify automation opportunities** - What scenarios should automated tests validate?
4. **Plan follow-up sessions** - Which areas need deeper investigation or different persona perspectives?

## 🔗 Related resources

- **[User stories](../user-stories/README.md)** - Requirements and acceptance criteria for delivered features
- **[Investigative testing guide](../test-strategy/investigative-testing.md)** - Complete framework and methodology
- **[Domain context](../test-strategy/domain-context.md)** - Marine licensing personas and user context
- **[Testing heuristics](../test-strategy/heuristics.md)** - Systematic thinking frameworks for investigation
- **[Feature files](../../test/features/)** - Automated test scenarios that validate delivered functionality

## 🛠️ Testing tools & resources

- **[Big list of naughty strings](https://github.com/minimaxir/big-list-of-naughty-strings)** - Comprehensive collection of problematic input strings for testing form validation and edge cases

---

_Test charters provide ready-to-execute investigation plans that combine systematic exploration with realistic user scenarios - revealing how delivered features actually serve marine licensing users under authentic conditions._
