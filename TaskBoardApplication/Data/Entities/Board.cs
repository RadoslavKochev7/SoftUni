using System.ComponentModel.DataAnnotations;
using static TaskBoardApplication.Data.DataConstants.Board;
namespace TaskBoardApplication.Data.Entities
{
    public class Board
    {
        public int Id { get; init; }

        [Required]
        [MaxLength(BoardMaxName)]
        public string Name { get; init; }

        public ICollection<Task> Tasks { get; set; } = new HashSet<Task>();
    }
}