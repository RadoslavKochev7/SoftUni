using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using static Watchlist.Data.GlobalConstants.MovieConstants;

namespace Watchlist.Models
{
    public class MovieViewModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(TitleMaxLength, MinimumLength = TitleMinLength)]
        public string Title { get; set; }

        [Required]
        [StringLength(DirectorMaxLength,MinimumLength = DirectorMinLength)]
        public string Director { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        [Range(typeof(decimal), RatingMaxLength, RatingMinLength)]
        public decimal Rating { get; set; }

        [ForeignKey(nameof(GenreId))]
        public int? GenreId { get; set; }

        public string? Genre { get; set; }
    }
}
