# Novice Journey Charter: First-Time Marine Licensing Experience

## Investigation Plan

**EXPLORE:** Complete exemption notification workflow from first-time user perspective  
**AS:** First-time marine licensing applicants (see References)  
**BECAUSE:** Discovery and completion challenges are critical barriers for individual applicants  
**LOOKING FOR:** Confusion points, guidance gaps, accessibility barriers, terminology issues in delivered functionality

**Duration:** 90 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-1: Project name & exemption creation](../user-stories/ML-1.provide.project.name.and.create.exemption.md)
  - [ML-9: Task list navigation](../user-stories/ML-9.view.the.task.list.md)
  - [ML-10: Activity dates](../user-stories/ML-10.provide.activity.dates.md)
  - [ML-11: Activity description](../user-stories/ML-11.provide.activity.description.md)
  - [ML-12: Public register content](../user-stories/ML-12.provide.or.withhold.public.register.content.md)
  - [ML-16: Site location input method](../user-stories/ML-16.choose.file.upload.or.manual.coordinate.entry.md)
  - [ML-17: Circle or coordinate list entry](../user-stories/ML-17.choose.circle.or.coordinate.list.entry.md)
  - [ML-18: Coordinate system selection](../user-stories/ML-18.choose.coordinate.system.md)
  - [ML-19: Enter coordinate for polygon site](../user-stories/ML-19.enter.coordinate.for.polygon.site.md)
  - [ML-35: Enter centre point of a circle](../user-stories/ML-35.enter.centre.point.of.a.circle.md)
  - [ML-36: Enter width of circular site](../user-stories/ML-36.enter.width.of.circular.site.md)
  - [ML-37: Review circular site details](../user-stories/ML-37.review.circular.site.details.md)
  - [ML-69: Choose file type to upload](../user-stories/ML-69.choose.file.to.upload.md)
  - [ML-70: Upload a coordinate file](../user-stories/ML-70.upload.a.coordinate.file.md)
  - [ML-82: Check answers before submission](../user-stories/ML-82.check.answers.circular.site.md)
  - [ML-84: Submit notification](../user-stories/ML-84.submit.notification.md)
- **Personas:**
  - [Sarah - Discovery-First User](../personas/sarah-discovery-first-user.md)

## Scenario Context

**Research Insight**: _"I thought it was really easy... The coordinates threw me off a bit... I'd probably ring someone if got stuck."_

**Focus**: Complete exemption notification journey for users new to marine licensing and government digital services. Sarah represents individual applicants who need occasional marine permissions but don't work professionally in the marine sector.

**Key Research Findings:**

- **Discovery challenges**: _"Findability is the main challenge - all users struggled to find and interpret guidance content correctly"_
- **Google-first behaviour**: _"All started with a Google search, 2 users went to a local authority harbour website"_
- **Technical anxiety**: _"The coordinates threw me off a bit"_ and _"I'd get an email. Because I've put those coords in wrong"_
- **Digital preferences**: _"Didn't like working on 2 screens"_

## Realistic Activities

- Test complete workflow discovery and progression through delivered task list
- Investigate project name creation and understanding of exemption notification concept
- Test activity date entry with validation scenarios (enhanced error messages for missing day/month/year)
- Evaluate activity description completion with character limits and guidance
- Test public register consent decision comprehension and confidence
- Investigate site details workflow decision points: file upload vs manual entry vs drawing
- Test file upload workflow: file type selection (KML vs Shapefile) → upload process → validation scenarios
- Evaluate file upload decision making for users without existing coordinate files
- Test manual coordinate entry: circle vs polygon selection → coordinate system choice → coordinate entry → review
- Test circular site workflow: centre point coordinate entry → width entry → review
- Test polygon site workflow: triangular boundary definition with three coordinate points
- Test coordinate entry accuracy for both WGS84 and OSGB36 systems with realistic user scenarios
- Simulate interruptions, incomplete information, and session resumption across all site entry methods
- Test error recovery and validation message comprehension across coordinate entry and file upload workflows
- Evaluate accessibility with screen reader and keyboard navigation for complete site details workflows

## Evidence Framework

### ✅ Positive signals

- **Discovery success**: Clear pathway through initial guidance to service entry
- **Confidence building**: Progressive disclosure supports uncertain users through workflow
- **Error prevention**: Validation prevents common mistakes without frustration
- **Completion success**: Users can complete workflow without external help
- **Accessibility support**: Service works with assistive technology and different devices

### ⚠️ Warning signs

- **Discovery confusion**: Users land on wrong websites or can't find correct service
- **Terminology barriers**: Marine licensing language creates uncertainty or abandonment
- **Navigation disorientation**: Users lose track of progress or get stuck between screens
- **Validation frustration**: Error messages confuse rather than help recovery
- **Technical overwhelm**: Coordinate entry creates anxiety or requires external help

### 🤔 Questions to investigate

- How does the current task list support users who are uncertain about requirements?
- What happens when Sarah encounters the coordinate system selection - does she understand the choice?
- How well do the enhanced validation messages (specific day/month/year errors) help recovery?
- Does the public register consent decision provide sufficient information for confident choice?
- Are there cultural or language barriers that affect comprehension in delivered features?

### 💡 Ideas to explore

- Could project name entry better support individual vs organisational contexts?
- How might coordinate system selection provide more confidence for non-technical users?
- What patterns from familiar consumer services could improve the current workflow?
- Are there opportunities for clearer progress indication through the task list?

## Session Notes Template

```
SESSION: Novice Journey Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

DISCOVERY AND PROGRESSION:
+ Effective guidance and support:
- Confusion and barrier points:
? Unclear or uncertain behaviours:
! Improvement opportunities:

DELIVERED FEATURE FINDINGS:
Project Name: [Terminology, validation, individual vs organisational understanding]
Task List: [Progress comprehension, navigation clarity, completion confidence]
Activity Dates: [Enhanced validation response, error recovery, date concepts]
Activity Description: [Text entry, character limits, guidance effectiveness]
Public Register: [Decision comprehension, consent implications understanding]
Site Details Flow: [Manual entry choice, circle selection, coordinate system confidence]
Coordinate Entry: [WGS84/OSGB36 understanding, validation response, error recovery]
Width Entry: [Numeric validation, units understanding]
Review: [Information comprehension, completion confidence]

ACCESSIBILITY FINDINGS:
Screen Reader: [Announcements, navigation, form interaction across workflow]
Keyboard Navigation: [Tab order, focus management, interaction patterns]
Cognitive Load: [Information processing, memory support, decision fatigue]

PERSONA INSIGHTS:
Sarah (Discovery-First): [Confidence building patterns, completion likelihood, support needs]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Complete exemption notification workflow including project name, task list, activity dates (enhanced validation), activity description, public register consent, and complete site details coordinate entry workflow

**Related charters:** See [Review and Submission](./review-and-submission.md) for focused investigation of final stage review confidence and submission patterns for first-time users
