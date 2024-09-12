/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_mail_key` ON `user`(`mail`);
