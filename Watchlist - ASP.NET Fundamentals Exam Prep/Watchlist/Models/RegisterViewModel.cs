﻿using System.ComponentModel.DataAnnotations;
using static Watchlist.Data.GlobalConstants.UserConstants;

namespace Watchlist.Models
{
    public class RegisterViewModel
    {
        [Required]
        [StringLength(UsernameMaxLength, MinimumLength = UsernameMinLength)]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength (EmailMaxLength, MinimumLength = EmailMinLength)]
        public string Email { get; set; }

        [Required]
        [StringLength(PasswordMaxLength, MinimumLength = PasswordMinLength)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare(nameof(Password))]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
