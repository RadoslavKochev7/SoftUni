using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Watchlist.Contracts;
using Watchlist.Data;
using Watchlist.Data.Entities;
using Watchlist.Models;

namespace Watchlist.Services
{
    public class MovieServices : IMovieService
    {
        private readonly WatchlistDbContext context;

        public MovieServices(WatchlistDbContext context)
        {
            this.context = context;
        }

        public async Task AddMovieAsync(MovieAddModel model)
        {
            var entity = new Movie()
            {
                Director = model.Director,
                GenreId = model.GenreId,
                ImageUrl = model.ImageUrl,
                Rating = model.Rating,
                Title = model.Title
            };

            await context.Movies.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task AddToCollectionAsync(int movieId, string userId)
        {
            var user = await context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.UserMovies)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid User Id");
            }

            var movie = await context.Movies.FirstOrDefaultAsync(u => u.Id == movieId);

            if (movie == null)
            {
                throw new ArgumentException("Invalid Movie Id");
            }

            if (!user.UserMovies.Any(um => um.MovieId == movieId))
            {
                var userMovie = new UserMovie()
                {
                    UserId = userId,
                    MovieId = movieId,
                };


                user.UserMovies.Add(userMovie);

                await context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<MovieViewModel>> GetAllMoviesAsync()
        {
            var entities = await context.Movies.ToListAsync();

            return entities.Select(m => new MovieViewModel()
            {
                Id = m.Id,
                Director = m.Director,
                Title = m.Title,
                Rating = m.Rating,
                ImageUrl = m.ImageUrl,
                Genre = m?.Genre?.Name
            });
        }

        public async Task<IEnumerable<Genre>> GetGenresAsync()
        {
           return await context.Genres.ToListAsync();
        }

        public async Task<IEnumerable<MovieViewModel>> GetWatchedMoviesAsync(string userId)
        {
            var user = await context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.UserMovies)
                .ThenInclude(um => um.Movie)
                .ThenInclude(g => g.Genre)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid User Id");
            }

            return user.UserMovies
                .Select(m => new MovieViewModel()
                {
                    Director = m.Movie.Director,
                    Genre = m.Movie.Genre?.Name,
                    Title = m.Movie.Title,
                    Id = m.Movie.Id,
                    ImageUrl = m.Movie.ImageUrl,
                    Rating = m.Movie.Rating,
                });
        }

        public async Task RemoveFromCollectionAsync(int movieId, string userId)
        {
            var user = await context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.UserMovies)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid User Id");
            }

            var movie = user.UserMovies.FirstOrDefault(u => u.MovieId == movieId);

            if (movie != null)
            {
                user.UserMovies.Remove(movie);
                await context.SaveChangesAsync();
            }
        }
    }
}
