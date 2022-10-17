namespace TaskBoardApplication.Data
{
    public class DataConstants
    {
        public class UserConstants
        {
            // User

            public const int UserFirstNameMaxLength = 15; 
            public const int UserLastNameMaxLength = 15; 
        }

        public class Task
        {
            // Task 

            public const int TitleMaxLength = 70;
            public const int TitleMinLength = 5;

            public const int DescriptionMaxLength = 1000;
            public const int DescriptionMinLength = 10;
        }

        public class Board
        {
            // Board

            public const int BoardMaxName = 30;
            public const int BoardMinName = 3;
        }
    }
}
