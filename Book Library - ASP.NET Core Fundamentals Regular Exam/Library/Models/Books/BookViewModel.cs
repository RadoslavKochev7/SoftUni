using Library.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Library.Data.GlobalConstants.LibraryConstants.BookConstants;


namespace Library.Models.Books
{
#nullable disable

    public class BookViewModel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(TitleMaxLength)]
        [MinLength(TitleMinLength)]
        public string Title { get; set; }

        [Required]
        [MaxLength(AuthorMaxLength)]
        [MinLength(AuthorMinLength)]
        public string Author { get; set; }

        [Required]
        [Range(typeof(decimal), RatingMinLength, RatingMaxLength)]
        public decimal Rating { get; set; }

        [Required]
        [MaxLength(DescriptionMaxLength)]
        [MinLength(DescriptionMinLength)]
        public string Description { get; set; }
        [Required]
        public string ImageUrl { get; set; }

        [Required]
        [ForeignKey(nameof(CategoryId))]
        public int CategoryId { get; set; }

        [Required]
        public string Category { get; set; }


    }
}
