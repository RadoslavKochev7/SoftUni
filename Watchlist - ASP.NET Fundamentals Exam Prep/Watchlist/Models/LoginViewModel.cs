using System.ComponentModel.DataAnnotations;
using static Watchlist.Data.GlobalConstants.UserConstants;

namespace Watchlist.Models
{
    public class LoginViewModel
    {
        [Required]
        public string Username { get; set; } = null!;


        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;
    }
}
