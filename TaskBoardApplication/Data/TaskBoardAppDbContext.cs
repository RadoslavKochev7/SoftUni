﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskBoardApplication.Data.Entities;
using Task = TaskBoardApplication.Data.Entities.Task;

namespace TaskBoardApplication.Data
{
    public class TaskBoardAppDbContext : IdentityDbContext<User>
    {
        private User GuestUser { get; set; }
        private Board OpenBoard { get; set; }
        private Board InProgressBoard { get; set; }
        private Board DoneBoard { get; set; }


        public TaskBoardAppDbContext(DbContextOptions<TaskBoardAppDbContext> options)
            : base(options)
        {
            this.Database.Migrate();
        }

        public DbSet<Board> Boards { get; set; }
        public DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Task>()
                .HasOne(t => t.Board)
                .WithMany(t => t.Tasks)
                .HasForeignKey(t => t.BoardId)
                .OnDelete(DeleteBehavior.Restrict);

            SeedUsers();
            builder.Entity<User>()
                .HasData(GuestUser);

            SeedBoards();
            builder.Entity<Board>()
                .HasData(OpenBoard, InProgressBoard, DoneBoard);

            builder.Entity<Task>()
                .HasData(new Task()
                {
                    Id = 1,
                    Title = "Prepare for ASP.NET fundamentals exam",
                    Description = "Leard using ASP.NET Identity",
                    CreatedOn = DateTime.Now.AddMonths(-1),
                    OwnerId = GuestUser.Id,
                    BoardId = OpenBoard.Id
                }, 
                new Task()
                {
                    Id = 2,
                    Title = "Improve EF Core skills",
                    Description = "Leard using EF Core and MS SQL Server Management Studio",
                    CreatedOn = DateTime.Now.AddMonths(-5),
                    OwnerId = GuestUser.Id,
                    BoardId = DoneBoard.Id
                },
                new Task()
                {
                    Id = 3,
                    Title = "Improve ASP.NET Core skills",
                    Description = "Leard using ASP.NET Identity",
                    CreatedOn = DateTime.Now.AddMonths(-10),
                    OwnerId = GuestUser.Id,
                    BoardId = InProgressBoard.Id
                },
                 new Task()
                 {
                     Id = 4,
                     Title = "Prepara for C# Fundamentals exam",
                     Description = "Prepare for solving exams",
                     CreatedOn = DateTime.Now.AddYears(-1),
                     OwnerId = GuestUser.Id,
                     BoardId = DoneBoard.Id
                 }
                );
            base.OnModelCreating(builder);
        }

        private void SeedUsers()
        {
            var hasher = new PasswordHasher<IdentityUser>();

            GuestUser = new User()
            {
                UserName = "guest",
                NormalizedUserName = "GUEST",
                Email = "guest@mail.com",
                NormalizedEmail = "GUEST@MAIL.COM",
                FirstName = "Guest",
                LastName = "User"
            };

            GuestUser.PasswordHash = hasher.HashPassword(GuestUser, "guest");
        }

        private void SeedBoards()
        {
            OpenBoard = new Board()
            {
                Id = 1,
                Name = "Open"
            };

            InProgressBoard = new Board()
            {
                Id = 2,
                Name = "In Progress"
            };

            DoneBoard = new Board()
            {
                Id = 3,
                Name = "Done"
            };
        }
    }
}