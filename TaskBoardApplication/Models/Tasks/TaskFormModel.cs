using System.ComponentModel.DataAnnotations;
using static TaskBoardApplication.Data.DataConstants.Task;

namespace TaskBoardApplication.Models.Tasks
{
    public class TaskFormModel
    {
        [Required]
        [StringLength(TitleMaxLength, MinimumLength = TitleMinLength, ErrorMessage = "Title should be at least {2} characters long.")]
        public string Title { get; set; }

        [Required]
        [StringLength(DescriptionMaxLength, MinimumLength = DescriptionMinLength, ErrorMessage = "Description should be at least {2} characters long.")]
        public string Description { get; set; }

        [Display(Name = "Board")]
        public int BoardId { get; set; }

        public IEnumerable<TaskBoardModel> Boards { get; set; }
    }
}
