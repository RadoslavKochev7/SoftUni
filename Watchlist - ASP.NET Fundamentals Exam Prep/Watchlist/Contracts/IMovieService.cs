using Watchlist.Data.Entities;
using Watchlist.Models;

namespace Watchlist.Contracts
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieViewModel>> GetAllMoviesAsync(); 

        Task<IEnumerable<Genre>> GetGenresAsync(); 

        Task AddMovieAsync(MovieAddModel model); 

        Task AddToCollectionAsync(int movieId, string userId);

        Task<IEnumerable<MovieViewModel>> GetWatchedMoviesAsync(string userId);

        Task RemoveFromCollectionAsync(int movieId, string userId);

    }
}
