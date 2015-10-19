using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularJSApi.Models
{
    [Table("Features")]
    public class Features
    {
        public Features() { }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FeatureId { get; set; }

        public string FeatureName { get; set; }
        public string FeatureDescription { get; set; }

        public int ProjectId { get; set; }
    }
}