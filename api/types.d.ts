interface Teacher {
  name: string;
  subject: Subject;
  email: string;
  contactNumber: string;
}

interface Class {
  level: Level;
  name: string;
  formTeacher: {
    name: string;
  };
}

declare enum Level {
  P1 = "Primary 1",
  P2 = "Primary 2",
  P3 = "Primary 3",
  P4 = "Primary 4",
  P5 = "Primary 5",
  P6 = "Primary 6"
}

declare enum Subject {
  EN = "English Language",
  MT = "Mother Tongue Language",
  MA = "Mathematics",
  SC = "Science",
  AT = "Art",
  MU = "Music",
  PE = "Physical Education",
  SS = "Social Studies",
  CE = "Character and Citizenship Education"
}