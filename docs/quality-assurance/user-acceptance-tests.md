1. Task: “Create a quiz in existing course”
  GIVEN:
    I'm logged in as a teacher
    The term “Tests” is opened
  WHEN I:
    Click "Create Quiz"
    Enter:
    Quiz name
    Time limit
    Add multiple-choice questions
    Click "Create"
  THEN the system:
    Creates the quiz with all questions
    Shows it in the course materials

2. Task: “Create a course”
  GIVEN:
    I'm logged in as admin
    Open the “Courses Term”
  WHEN I:
    Click "Create Course"
    Enter:
    Name
    Add participants
    Click "Save"
  THEN the system:
    Creates course
    Auto-enrolls qualified students

3. Task: “Create a group”
  GIVEN:
    I'm logged in as a teacher
  WHEN I:
    Open "Group Management"
    Click "Create Group"
    Name it
    Manually add students
    Set group submission folder
  THEN the system:
    Creates the group with selected members

2 new tests:

4. Task: "Add new user with role teacher to the system"
   GIVEN:
    I'm logged in as an admin
  WHEN I:
    Open "Database"
    Click "Add user"
    Enter the email
    Choose the role "Teacher"
    Click on "Add a user"
  THEN the system:
    Add the user with "Teacher" role in the system

5. Task: “Create an assignment in existing course”
  GIVEN:
    I'm logged in as a teacher
    The term “Tests” is opened
  WHEN I:
    Click "Create Assignment"
    Enter:
    Assignment name
    Time limit
    Add files
    Add the description
    Click "Create"
  THEN the system:
    Creates the assignment with all files and additional materials
    Shows it in the course materials
