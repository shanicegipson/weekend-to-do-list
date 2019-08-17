CREATE TABLE "task" (
    "id" serial primary key,
    "task" varchar(80) not null,
    "date" date,
    "status" varchar(20),

);

