using System.Linq;
using System.Web.Http;
using AngularJSApi.Models;

namespace AngularJSApi.Controllers
{
    public class ExtendFeatureApiController : ApiController
    {
        //GET/<controller>
        /// <summary>
        /// Another Get function to get one feature from db by FeatureId
        /// </summary>
        /// <param name="id">From Angular Controllers</param>
        /// <returns></returns>
        public IHttpActionResult Get(int id)
        {
            using (AngularContext db = new AngularContext())
            {
                var feature = db.Features.Where(a => a.FeatureId == id).ToList();
                return Ok(feature);
            }
        }
    }
}