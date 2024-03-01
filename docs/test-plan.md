# BSWA 2023-2024 – [TrackMates](http://development.eu-central-1.elasticbeanstalk.com/) – Test Plan

## Introduction

The purpose of this test plan is to describe the testing process of the “TrackMates” web and Progressive Web App (PWA). “TrackMates” is an application for habit tracking in online courses, providing users with a platform to manage, track, and share their learning progress.

## 1. Feature priorities

- User authentication: registration / authorization
- Course management: adding and viewing courses, tracking progress
- Social features: friends management and activity feed, notifications, likes, comments, chats
- User’s profile management
- AI-based course suggestions
- Progressive Web App (PWA) support

## 2. Team availability hours

- **Development Team:**
  - Monday – Friday: 9:00 AM to 6:00 PM (local time)
  - Saturday – Sunday: 9:00 AM to 5:00 PM (local time)
- **QA Team:**
  - Monday – Friday: 9:00 AM to 6:00 PM (local time)
  - Saturday – Sunday: 9:00 AM to 4:00 PM (local time)

## 3. Test approach (backend / frontend decomposition)

- **Backend Testing:**
  - Validate API endpoints, database interactions and server-side functionalities.
  - Tools: Postman for API testing.
  - Artifacts: Design, Specification, Test Cases.
  - Decomposition: Test APIs for user authentication, course management, social features and user’s profile management.
- **Frontend Testing:**
  - Validate user interface and navigation.
  - Tools: Web Developer Tools.
  - Artifacts: Design, Specification, Test Cases.
  - Decomposition: Test UI components for user authentication, course management, social features and user’s profile management.

## 4. What will we automate? On what level?

- **Automation Scope:**
  API testing for backend functionalities related to user authentication, course management, social features and user’s profile management.

- **Automation Tools:**
  TypeScript, Mocha, Chai.

## 5. Features implemented

- **User authentication:**

  - Registration
  - Authorization

- **Course management:**

  - Backend APIs in progress.
  - Frontend UI components partially implemented.

- **Social features:**

  - Backend APIs in progress.
  - Frontend UI components partially implemented.

- **User’s profile management:**

  - Backend APIs in progress.
  - Frontend UI components partially implemented.

- **AI-based course suggestions:**
  - AI algorithms integrated.
  - Frontend UI components in progress.

## 6. Features planned

- **User authentication:**

  - Password reset
  - Registration with Google / Facebook account

- **Course management:**

  - Adding and viewing courses
  - Courses search
  - Progress tracking

- **Social features:**
  - Friends management
  - Friends search
  - Friends activity feed
  - Notifications
  - Likes, comments, chats
  - Progress comparing

## 7. Demo date / final scope

- **Demo Date:**
  - Release 1 – scheduled for 12:00 p.m., February 23, 2024
  - Release 2 – scheduled for 12:00 p.m., March 1, 2024
  - Release 3 – scheduled for March 8, 2024
  - Release 4 – scheduled for March 15, 2024
  - Final demo – scheduled for March 23, 2024
- **Final Scope:**
  - Fully functional user authentication and user’s profile management
  - Fully functional course management system.
  - Full implementation of social features and activity section.
  - AI-based course suggestions implemented.
