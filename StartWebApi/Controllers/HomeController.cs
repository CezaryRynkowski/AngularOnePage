using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web.Mvc;
using AngularJSApi.Models;
using DotNet.Highcharts;
using DotNet.Highcharts.Enums;
using DotNet.Highcharts.Helpers;
using DotNet.Highcharts.Options;

namespace AngularJSApi.Controllers
{
    /// <summary>
    /// Main MVC controller, returns 2 charts
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Show main view
        /// </summary>
        /// <returns>Main View</returns>
        public ActionResult Index()
        {
            using (AngularContext db = new AngularContext())
            {
                //FIRST CHART
                var open = db.Tasks.Count(x => x.Open);
                var close = db.Tasks.Count(x => x.Open == false);
                //create a collection of data
                var transactionCounts = new List<Developer> { 
                           new Developer(){  Name="Opened", Salary= open},
                           new Developer(){  Name="Closed", Salary=close},

                            };

                //modify data type to make it of array type
                var xDataMonths = transactionCounts.Select(i => i.Name).ToArray();
                var yDataCounts = transactionCounts.Select(i => new object[] { i.Salary }).ToArray();

                //instantiate an object of the Highcharts type
                var chart = new Highcharts("chart")
                    //define the type of chart 
                            .InitChart(new Chart { DefaultSeriesType = ChartTypes.Pie })
                    //overall Title of the chart 
                            .SetTitle(new Title { Text = "Opened task vs Closed task" })
                    //small label below the main Title
                            .SetSubtitle(new Subtitle { Text = DateTime.Now.ToShortDateString() })
                    //load the Y values 
                            .SetSeries(new[]
                    {
                        new Series {Name = xDataMonths[0],Color = Color.Brown, Data = new Data(yDataCounts)},
                         new Series {Name = xDataMonths[1], Data = new Data(yDataCounts)}
                            //you can add more y data to create a second line
                            // new Series { Name = "Other Name", Data = new Data(OtherData) }
                    });

                List<Highcharts> chartList = new List<Highcharts>();
                chartList.Add(chart);

                //SECOND CHART
                var today = DateTime.Now.Date;
                var tasks = db.Tasks.Count(x => x.ClosingDate == today);
                var transactionCounts2 = new List<Developer>
                {
                    new Developer() {Name = "test", Salary=tasks }
                };
                object[] toCharts = transactionCounts2.Select(x => new object[] {x.Salary}).ToArray();
                var chart2 = new Highcharts("chart2")
                    //define the type of chart 
                    .InitChart(new Chart { DefaultSeriesType = ChartTypes.Bar })
                    //overall Title of the chart 
                    .SetTitle(new Title { Text = "Tasks closed Today" })
                    //small label below the main Title
                    .SetSubtitle(new Subtitle { Text = DateTime.Now.ToShortDateString() })
                    .SetSeries(new[]
                    {
                        new Series {Name = "Tasks closed Today", Data = new Data(toCharts)}
                    });

                chartList.Add(chart2);
                return View(chartList);
            }
        }
    }
}