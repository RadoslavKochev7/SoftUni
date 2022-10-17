using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using static TaskBoardApplication.Data.DataConstants;

namespace TaskBoardApplication.Data.Entities
{
    public class User : IdentityUser
    {
        [Required]
        [MaxLength(UserConstants.UserFirstNameMaxLength)]
        public string FirstName { get; init; }

        [Required]
        [MaxLength(UserConstants.UserLastNameMaxLength)]
        public string LastName { get; init; }
    }
}
