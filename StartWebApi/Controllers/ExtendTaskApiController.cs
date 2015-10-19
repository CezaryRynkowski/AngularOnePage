using System.Linq;
using System.Web.Http;
using AngularJSApi.Models;

namespace AngularJSApi.Controllers
{
    public class ExtendTaskApiController : ApiController
    {
        /// <summary>
        /// Another get function to get task from db by TaskId
        /// </summary>
        /// <param name="id">From angular controller</param>
        /// <returns></returns>
        public IHttpActionResult Get(int id)
        {
            using (AngularContext db = new AngularContext())
            {
                var task = db.Tasks.Where(a => a.TaskId == id).ToList();
                return Ok(task);
            }
        }
    }
}
