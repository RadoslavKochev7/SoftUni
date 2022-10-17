using System.ComponentModel.DataAnnotations;
using static TaskBoardApplication.Data.DataConstants.Task;

namespace TaskBoardApplication.Data.Entities
{
    public class Task
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }

        public int BoardId { get; set; }

        public Board Board { get; init; }

        [Required]
        public string OwnerId { get; set; }

        public User Owner { get; set; }

    }
}
