using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Watchlist.Data.GlobalConstants.MovieConstants;

namespace Watchlist.Data.Entities
{
    public class Movie
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MaxLength(DirectorMaxLength)]
        public string Director { get; set; }

        [Required]
        public string ImageUrl { get; set; } 

        public decimal Rating { get; set; }

        [ForeignKey(nameof(GenreId))]
        public int? GenreId { get; set; }

        public Genre? Genre { get; set; }

        public ICollection<UserMovie> UsersMovies { get; set; } = new List<UserMovie>();
    }
}