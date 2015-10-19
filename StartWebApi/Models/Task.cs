using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularJSApi.Models
{
    [Table("Tasks")]
    public class Task
    {
        [Key]
        public int TaskId { get; set; }

        public int FeatureId { get; set; }
        public int DeveloperId { get; set; }
        public string WorkLoad { get; set; }
        [Column("Open?")]
        public bool Open { get; set; }
        public string Description { get; set; }
        public DateTime? ClosingDate { get; set; }

    }
}