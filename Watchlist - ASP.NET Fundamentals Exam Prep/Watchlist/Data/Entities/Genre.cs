using System.ComponentModel.DataAnnotations;
using static Watchlist.Data.GlobalConstants.GenreConstants;
using RequiredAttribute = System.ComponentModel.DataAnnotations.RequiredAttribute;

namespace Watchlist.Data.Entities
{
    public class Genre
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }
    }
}
