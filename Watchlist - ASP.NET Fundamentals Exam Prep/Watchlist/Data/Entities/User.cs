using Microsoft.AspNetCore.Identity;

namespace Watchlist.Data.Entities
{
    public class User : IdentityUser
    {
        public ICollection<UserMovie> UserMovies { get; set; } = new List<UserMovie>();
    }
}
