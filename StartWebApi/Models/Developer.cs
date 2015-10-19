using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularJSApi.Models
{
    [Table("Developer")]
    public class Developer
    {
        public Developer() { }

        [Key]
        public int DeveloperId { get; set; }
        public string Name { get; set; }
        public int Salary { get; set; }
    }
}