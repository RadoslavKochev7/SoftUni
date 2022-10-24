namespace Library.Data.GlobalConstants
{
    public class LibraryConstants
    {
        public class BookConstants
        {
            // Title
            public const int TitleMaxLength = 50;
            public const int TitleMinLength = 10;

            // Author 
            public const int AuthorMaxLength = 50;
            public const int AuthorMinLength = 5;

            // Description
            public const int DescriptionMaxLength = 5000;
            public const int DescriptionMinLength = 5;

            // Rating
            public const string RatingMaxLength = "0.00";
            public const string RatingMinLength = "10.00";
        }

        public class CategoryConstants
        {
            public const int CategoryNameMaxLength = 50;
            public const int CategoryNameMinLength = 5;
        }

        public class ApplicationUserConstants
        {
            // Username
            public const int UsernameMaxLength = 20;
            public const int UsernameMinLength = 5;

            // Email
            public const int EmailMaxLength = 60;
            public const int EmailMinLength = 10;

            // Password
            public const int PasswordMaxLength = 20;
            public const int PasswordMinLength = 5;
        }
    }
}
