# BSWA 2023-2024 – [TrackMates](http://development.eu-central-1.elasticbeanstalk.com/) – Specification

## 1. Introduction

### 1.1. Project Overview

The project aims to develop a web and Progressive Web App (PWA) for habit tracking in online courses, providing users with a platform to manage, track, and share their learning progress.

### 1.2. Similar applications

- [Way Of Life](https://wayoflifeapp.com/) – Habit Tracker

### 1.3. Key Features

- Course management with the ability to add, view, and track progress.
- AI-based course suggestions for users.
- Social features including friend management and activity feeds.
- Activity section showcasing user accomplishments.

## 2. Pages

### 2.1. Auth Page

The "Auth" page provides "Sign In" / "Sign Up" forms for unauthorized / unregistered users.

**Element:** This is a separate page / screen.

**How to reach:** An unauthorized / unregistered user is redirected to the "Sign In" form of this page from the restricted pages (i.e., all other pages) or after following the base URL (https://trackmates.net). A registered and authorized user is redirected to this page after logging out.

**Where to go:** The user is redirected to the "Overview" page after successful authorization / registration.

- **Sign Up**

  The user is able to register by filling the registration form. The "Sign Up" form on the page includes:

  - "First name" field (required)

    - Lowercase and uppercase Latin letters, one hyphen and one apostrophe are allowed
    - Hyphen and apostrophe can’t be next to each other
    - The first and last characters must be letters
    - Should display a "First name" placeholder
    - Minimum length – 2 characters
    - Maximum length – 35 characters

  - "Last name" field (required)

    - Lowercase and uppercase Latin letters, one hyphen and one apostrophe are allowed
    - Hyphen and apostrophe can’t be next to each other
    - The first and last characters must be letters
    - Should display a "Last name" placeholder
    - Minimum length – 2 characters
    - Maximum length – 35 characters

  - "Email" field (required)

    - Should contain a local part, an "@" symbol and a domain part
    - Local part:
      - Lowercase and uppercase Latin letters, digits, non-consecutive underscores and non-consecutive dots are allowed
      - Underscore and dot can’t be next to each other
      - Underscore and dot can’t be the first or last character of the local part
      - Minimum length – 1 character
      - Maximum length – 35 characters
    - Domain part:
      - Lowercase and uppercase Latin letters, digits, non-consecutive hyphens and non-consecutive dots are allowed
      - Hyphen and dot can’t be next to each other
      - Hyphen and dot can’t be the first or last character of the domain part
      - At least one dot is required
      - Minimum length – 4 characters
      - Maximum length – 35 characters
    - Should display the "email@example.com" placeholder
    - Should check the entered email to be unique

  - "Password" field (required)
    - Lowercase and uppercase Latin letters, digits, special characters are allowed ``!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~``
    - Should implement masking and display entered symbols as dots by default, the reveal icon near the right border of the field should allow the user to reveal the password
    - Should display eight dots as placeholder
    - Minimum length – 8 characters
    - Maximum length – 26 characters
  - "Create an account" button – after filling the required fields with valid data the user is redirected to the "Overview" page
  - "Log in" link to navigate to the "Sign In" form
  - "Google" icon to sign up with a Google account
  - "Facebook" icon to sign up with a Facebook account

  The user can be redirected to this form from the "Sign In" form by following the "Create an account" link.

  **Validation errors:**

  "First Name" validation errors:

  - If the field contains characters other than Latin letters, hyphen and apostrophe – the field is highlighted in red, the "Use only A-Z, a-z, 1 hyphen & 1 apostrophe" message is shown below the field
  - If the field contains hyphen and apostrophe next to each other – the field is highlighted in red, the "Avoid hyphen-apostrophe combination" message is shown below the field
  - If the first or last character in the field is not a letter – the field is highlighted in red, the "First and last characters must be letters" message is shown below the field
  - If the field contains less than 2 characters – the field is highlighted in red, the "Minimum length – 2 characters" message is shown below the field
  - If the field contains more than 35 characters – the field is highlighted in red, the "Maximum length – 35 characters" message is shown below the field
  - If the field is left empty – the field is highlighted in red, the "This field is required" message is shown below the field

  "Last Name" validation errors:

  - If the field contains characters other than Latin letters, hyphen and apostrophe – the field is highlighted in red, the "Use only A-Z, a-z, 1 hyphen & 1 apostrophe" message is shown below the field
  - If the field contains hyphen and apostrophe next to each other – the field is highlighted in red, the "Avoid hyphen-apostrophe combination" message is shown below the field
  - If the first or last character in the field is not a letter – the field is highlighted in red, the "First and last characters must be letters" message is shown below the field
  - If the field contains less than 2 characters – the field is highlighted in red, the "Minimum length – 2 characters" message is shown below the field
  - If the field contains more than 35 characters – the field is highlighted in red, the "Maximum length – 35 characters" message is shown below the field
  - If the field is left empty – the field is highlighted in red, the "This field is required" message is shown below the field

  "Email" validation errors:

  - If the local part of the entered email is longer than 35 characters – the field is highlighted in red, the "Max. local part length – 35 characters" message is shown below the field
  - If the domain part of the entered email is longer than 35 characters – the field is highlighted in red, the "Max. domain part length – 35 characters" message is shown below the field
  - If the entered email does not correspond to the other requirements, specified in this document – the field is highlighted in red, the "Email is invalid" message is shown below the field
  - If the entered email is already registered – the "Email is already taken." message appears as a toast-message
  - If the field is left empty – the field is highlighted in red, the "This field is required" message is shown below the field

  "Password" validation errors:

  - If the field contains non-Latin letters – the field is highlighted in red, the "Use only A-Z, a-z, 0-9 & special characters" message is shown below the field
  - If the field contains less than 8 characters – the field is highlighted in red, the "Minimum length – 8 characters" message is shown below the field
  - If the field contains more than 26 characters – the field is highlighted in red, the "Maximum length – 26 characters" message is shown below the field
  - If the field is left empty – the field is highlighted in red, the "This field is required" message is shown below the field

- **Sign In**

  The user is able to authorize by filling the authorization form. The "Sign In" form on the page includes:

  - "Email" field (required)

    - Should contain a local part, an "@" symbol and a domain part
    - Local part:
      - Lowercase and uppercase Latin letters, digits, non-consecutive underscores and non-consecutive dots are allowed
      - Underscore and dot can’t be next to each other
      - Underscore and dot can’t be the first or last character of the local part
      - Minimum length – 1 character
      - Maximum length – 35 characters
    - Domain part:
      - Lowercase and uppercase Latin letters, digits, non-consecutive hyphens and non-consecutive dots are allowed
      - Hyphen and dot can’t be next to each other
      - Hyphen and dot can’t be the first or last character of the domain part
      - At least one dot is required
      - Minimum length – 4 characters
      - Maximum length – 35 characters
    - Should display the "email@gmail.com" placeholder

  - "Password" field (required)

    - Should implement masking and display entered symbols as dots by default, the reveal icon near the right border of the field should allow the user to reveal the password
    - Should display eight dots as placeholder
    - Minimum length – 8 characters
    - Maximum length – 26 characters

  - "Log In" button – after filling the fields with valid credentials and clicking the "Log In" button the user is redirected to the "Overview" page

  - "Forgot Password?" link to navigate to the "Forgot Password" form

  - "Create an account" link to navigate to the "Sign Up" form

  - "Google" icon to sign in with a Google account

  - "Facebook icon to sign in with a Facebook account

  The user can be redirected to this form from the "Sign Up" form by following the "Log in" link.

  **Validation errors:**

  After trying to log in with invalid credentials, the "Invalid credentials." message appears as a toast-message.

  "Email" validation errors:

  - If the local part of the entered email is longer than 35 characters – the field is highlighted in red, the "Max. local part length – 35 characters" message is shown below the field
  - If the domain part of the entered email is longer than 35 characters – the field is highlighted in red, the "Max. domain part length – 35 characters" message is shown below the field
  - If the entered email does not correspond to the other requirements, specified in this document – the field is highlighted in red, the "Email is invalid" message is shown below the field
  - If the field is left empty – the field is highlighted in red, the "This field is required" message is shown below the field

  "Password" validation errors:

  - If the field contains less than 8 characters – the field is highlighted in red, the "Minimum length – 8 characters" message is shown below the field
  - If the field contains more than 26 characters – the field is highlighted in red, the "Maximum length – 26 characters" message is shown below the field
  - If the field is left empty – the field is highlighted in red, the "This field is required" message is shown below the field

### 2.2. Header Component

The header component provides quick access to the pages.

**Element:** This is a header component.

**How to reach:** The header component is present on all pages, except the Auth Page.

**Where to go:** The user can use the "Search" field and navigate to the "Notifications" page, the "Chats" page and the "My Profile" page.

The header component includes:

- "Search" field (should display the "Search or type" placeholder)
- "Notifications" icon – allows the user to navigate to the "Notifications" page, informs the user if there are unread notifications by displaying their number at the top right corner of the icon
- "Chats" icon – allows the user to navigate to the "Chats" page, informs the user if there are unread messages by displaying their number at the top right corner of the icon
- "My Profile" icon – allows the user to navigate to the "My profile" page, has the appearance of the user’s profile picture

### 2.3. Sidebar Component

The sidebar component provides quick access to the pages.

**Element:** This is a sidebar component.

**How to reach:** The sidebar component is present on all pages, except the Auth Page.

**Where to go:** The user can navigate to the "Overview" page, the "Activities" page, the "Friends" page, and to log out.

The sidebar component includes:

- "Overview" button – allows the user to navigate to the "Overview" page
- "Activities" button – allows the user to navigate to the "Activities" page
- "Friends" button – allows the user to navigate to the "Friends" page
- "Log Out" button – allows the user to log out, after which the user is redirected to the "Sign In" form of the Auth Page

### 2.4. Overview Page

The "Overview" page greets the user and displays their enrolled courses, providing quick access to course details and progress.

**Element:** This is a separate page / screen.

**How to reach:** The user is redirected to the "Overview" page after successful authorization / registration, from other pages – by clicking the "Overview" button on the sidebar.

**Where to go:** The user can open the "Add course" pop-up window, explore their "Courses" section and navigate to the "Course Details" page of a particular course.

The "Overview" page includes:

- "Welcome" block – featuring "Welcome back" text, followed by the first and last name of the user, and the "Add course" button. The user can open the "Add course" pop-up window by clicking the "Add course" button.
- "Courses" section – featuring the user’s enrolled courses as the list of course components. The user can navigate to the "Course Details" page of a particular course by clicking the corresponding course component.

### 2.5. Add Course Pop-Up Window

The "Add course" pop-up window allows the user to search for and add new courses from the supported learning platforms. AI-based suggestions are also displayed below the search results section in the "Recommended courses" section.

**Element:** This is a pop-up window.

**How to reach:** The user can open the "Add course" pop-up window by clicking the "Add course" button on the "Welcome" block on the "Overview" page.

**Where to go:** The user can navigate to the "Course Details" page of a particular course by clicking the corresponding course component.

The "Add course" pop-up window includes:

- "Search" field (should display the "Search or type" placeholder)
- Learning platform buttons – allow the user to choose from which platforms they would like to perform a search
- Search results section – featuring the corresponding courses as the list of course components
- "Recommended courses" section – featuring the recommended by AI courses as the list of course components
- The course components on the "Add course" pop-up window include the course title, the course preview picture, the platform label and the "Read More" and "Add" buttons
- The user can navigate to the "Course Details" page of a particular course by clicking the corresponding course component

### 2.6. Course Details Page

The "Course Details" page displays the main details about a particular course and allows the user to track their progress during their learning process.

**Element:** This is a separate page / screen.

**How to reach:** By clicking a course component on the "Overview" page, on the "Add course" pop-up window or on another user’s page.

By default the "Course Details" page includes:

- A picture, representing the course
- "About" and "Details" tabs – featuring the information about the course

The "Course Details" page, reached from the "Overview" page, includes:

- "Course Content" section – featuring the list of the course sections with checkboxes, using which the user is able to track their progress of studying the course
- "Course Activities" block – featuring a progress circle chart, indicating the studying progress in percents by counting the ratio between the "Completed" and "In Progress" sections

### 2.7. Friends Page

The "Friends" page helps to manage the user’s friends list. It allows the user to search for friends, to start following other users or to unfollow them. It also allows the user to check the list of their followers and followings.

**Element:** This is a separate page / screen.

**How to reach:** By clicking the "Friends" button on the sidebar.

**Where to go:** The user can navigate to the "User Profile" page of a particular user.

The "Friends" page provides three tabs: "Find friends", "Followers" and "Following". The user can switch between the tabs by clicking the corresponding labels.

- The "Find friends" tab provides the list of users, which may be followed by the current user. Each list component contains the user’s profile picture, the user’s first and last name, the "Follow" button and the "Chat" button. The "Follow" button on the user component may turn into the "Following" button if the current user starts following the user.
- The "Followers" tab provides the list of users, who follow the current user. Each list component contains the user’s profile picture, the user’s first and last name, the "Follow" or "Following" button, depending on whether the current user follows the user, and the "Chat" button.
- The "Following" tab provides the list of users, whom the current user is following. Each list component contains the user’s profile picture, the user’s first and last name, the "Following" button and the "Chat" button. The "Following" button on the user component may turn into the "Follow" button if the current user unfollows the user.

### 2.8. User Profile Page

The "User Profile" page allows the current user to see the list of all courses that a particular user takes.

**Element:** This is a separate page / screen.

**How to reach:** By clicking the user component on the "Friends" page.

**Where to go:** The user can navigate to the "User Course Details" page of a particular course from the list of courses, taken by the specified user.

The "User Profile" page includes:

- The user’s section – featuring the user’s profile picture, the user’s first and last name, and the "Follow" / "Following" button.
- "Courses" section – featuring the user’s enrolled courses as the list of Course Components. The section provides three tabs: "All", "Active" and "Completed". The user can switch between the tabs by clicking the corresponding labels and navigate to the "User’s Course Details" page of a particular course by clicking the corresponding course component.

### 2.9. Activities Page

The "Activities" page displays a consolidated timeline of all friends' learning activities.

**Element:** This is a separate page / screen.

**How to reach:** By clicking the "Activities" button on the sidebar.

**Where to go:** The user can navigate to the "User Profile" page of a particular user, who left a comment, or to the "Overview" page through the click on their own comment.

Each activity element on the "Activities" page contains:

- "Like" button – allows the user to like the activity, a total number of likes is shown to the left from the button
- "Comment" button – allows the user to comment the activity, a total number of likes is shown to the left from the button

When the user clicks the "Comment" button, the "Comment" section expands, showing all the comments to the activity and allowing the user to leave a comment.

### 2.10. Chats Page

The "Chats" page allows the user to exchange messages with other users.

**Element:** This is a separate page / screen.

**How to reach:** By clicking the "Chats" icon on the header or the "Chat" button on a user component on the "Friends" page.

The "Chats" page includes:

- "Search" field (should display the "Search or type" placeholder) – allows the user to perform a search among the existing conversations
- Chat list – displays a list of all ongoing conversations
- If there aren’t any conversations – the "Create a new one" link is displayed, which navigates the user to the "Friends" page
- Chat area, featuring messages between the current user and the user, the chat with whom is chosen on the list
- The message input field – allows the user to type and send messages to the selected chat recipient
  - The field supports a maximum text length of 512 characters
  - If the user exceeds this limit, the "Maximum text length — 512 characters" validation message is shown below the field

### 2.11. Notifications Page

The "Notifications" page displays a list of notifications about the users, who started following the current user.

**Element:** This is a separate page / screen.

**How to reach:** By clicking the "Notifications" icon on the header or the "Chat" button on a user component on the "Friends" page.

Each notification element on the "Notifications" page contains:

- The user’s profile picture
- The notification message: "{firstName} {lastName} left a comment.", "{firstName} {lastName} started following you." or "{firstName} {lastName} liked your activity." message with {firstName} and {lastName} being a user’s first name and last name respectively
- The time, when the action occurred
  The page provides four filters for notifications: "All", "Comments", "Followers" and "Likes". The user can switch between the filters by clicking the corresponding label.

### 2.12. My Profile Page

The "My Profile" page displays the current user’s profile details and allows the user to update them.

**Element:** This is a separate page / screen.

**How to reach:** By clicking the "My Profile" icon on the header.

The "My Profile" page includes:

- "Profile Picture" component, featuring the profile picture and the "Change photo" button, which allows the user to update the profile picture

  - Supported image file formats: PNG and JPG
  - Supported image file size: less than 5 MB
  - Before the first profile picture update each registered user has the default profile picture

- "First name" field (required)

  - Lowercase and uppercase Latin letters, one hyphen and one apostrophe are allowed
  - Hyphen and apostrophe can’t be next to each other
  - The first and last characters must be letters
  - Should display the user’s first name
  - Minimum length – 2 characters
  - Maximum length – 35 characters

- "Last Name" field (required)

  - Lowercase and uppercase Latin letters, one hyphen and one apostrophe are allowed
  - Hyphen and apostrophe can’t be next to each other
  - The first and last characters must be letters
  - Should display the user’s last name
  - Minimum length – 2 characters
  - Maximum length – 35 characters

- "Nickname" field

  - Lowercase Latin letters, digits and underscores are allowed
  - At least one lowercase Latin letter is required
  - Should display a placeholder, which consists of the user's lowercase first name, lowercase last name and ID, separated by underscores: firstName_lastName_ID
  - Minimum length – 5 characters
  - Maximum length – 35 characters
  - If edited, should check the entered nickname to be unique

- "Sex" drop-down list

  - Only one option can be selected
  - The options are "Male", "Female" and "Prefer not to say"
  - Should display the "Select sex" placeholder

- "Cancel" button – allows the user to undo all changes made
- "Update" button – allows the user to save all changes made

If the changes are saved successfully, the "Changes are saved." message appears as a toast-message.

**Validation errors:**

"Profile Picture" validation errors:

- If the user chooses an image file that has a format other than JPG and PNG – the "Image file format is invalid." message appears as a toast-message
- If the user chooses an image file that is larger than 5 MB – the "File is too large" message appears as a toast-message

"First Name" validation errors:

- If the field contains characters other than Latin letters, hyphen and apostrophe – the field is highlighted in red, the "Use only A-Z, a-z, 1 hyphen & 1 apostrophe" message is shown below the field
- If the field contains hyphen and apostrophe next to each other – the field is highlighted in red, the "Avoid hyphen-apostrophe combination" message is shown below the field
- If the first or last character in the field is not a letter – the field is highlighted in red, the "First and last characters must be letters" message is shown below the field
- If the field contains less than 2 characters – the field is highlighted in red, the "Minimum length – 2 characters" message is shown below the field
- If the field contains more than 35 characters – the field is highlighted in red, the "Maximum length – 35 characters" message is shown below the field
- If the field is left empty – the field is highlighted in red, the "This field is required" message is shown below the field

"Last Name" validation errors:

- If the field contains characters other than Latin letters, hyphen and apostrophe – the field is highlighted in red, the "Use only A-Z, a-z, 1 hyphen & 1 apostrophe" message is shown below the field
- If the field contains hyphen and apostrophe next to each other – the field is highlighted in red, the "Avoid hyphen-apostrophe combination" message is shown below the field
- If the first or last character in the field is not a letter – the field is highlighted in red, the "First and last characters must be letters" message is shown below the field
- If the field contains less than 2 characters – the field is highlighted in red, the "Minimum length – 2 characters" message is shown below the field
- If the field contains more than 35 characters – the field is highlighted in red, the "Maximum length – 35 characters" message is shown below the field
- If the field is left empty – the field is highlighted in red, the "This field is required" message is shown below the field

"Nickname" validation errors:

- If the field contains characters other than lowercase Latin letters, digits and underscores – the field is highlighted in red, the "Use only a-z, 0-9 & underscores" message is shown below the field
- If the field contains no lowercase Latin letters – the field is highlighted in red, the "Use at least one Latin letter" message is shown below the field
- If the field contains less than 5 characters – the field is highlighted in red, the "Minimum length – 5 characters" message is shown below the field
- If the field contains more than 35 characters – the field is highlighted in red, the "Maximum length – 35 characters" message is shown below the field
- If the entered nickname is already registered – the "Nickname is already taken." message appears as a toast-message
