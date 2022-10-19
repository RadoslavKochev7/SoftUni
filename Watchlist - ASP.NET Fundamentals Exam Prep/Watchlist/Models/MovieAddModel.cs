using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Watchlist.Data.Entities;
using static Watchlist.Data.GlobalConstants.MovieConstants;

namespace Watchlist.Models
{
    public class MovieAddModel
    {
        [Required]
        [StringLength(TitleMaxLength, MinimumLength = TitleMinLength)]
        public string Title { get; set; } = null!;

        [Required]
        [StringLength(DirectorMaxLength, MinimumLength = DirectorMinLength)]
        public string Director { get; set; } = null!;

        [Required]
        public string ImageUrl { get; set; } = null!;

        [Required]
        [Range(typeof(decimal), RatingMaxLength, RatingMinLength)]
        public decimal Rating { get; set; }

        [ForeignKey(nameof(GenreId))]
        public int? GenreId { get; set; }

        public string? Genre { get; set; }

        public IEnumerable<Genre> Genres { get; set; } = new List<Genre>();
    }
}
