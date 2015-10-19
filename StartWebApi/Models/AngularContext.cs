using System.Data.Entity;

namespace AngularJSApi.Models
{
    public class AngularContext : DbContext
    {
        public AngularContext()
        {
            Database.SetInitializer<AngularContext>(null);
        }

        public DbSet<Developer> Developer { get; set; }

        public DbSet<Project> Project { get; set; }

        public DbSet<Features> Features { get; set; }

        public DbSet<Task> Tasks { get; set; }
    }
}