using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using AngularJSApi.Models;

namespace AngularJSApi.Controllers
{
    public class FeatureApiController : ApiController
    {
        /// <summary>
        /// Getting all features from db
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Features> GetAll()
        {
            using (AngularContext db = new AngularContext())
            {
                return db.Features.ToList();
            }
        }

        /// <summary>
        /// Get one feature from db by ProjectId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IHttpActionResult Get(int id)
        {
            using (AngularContext db = new AngularContext())
            {
                var feature = db.Features.Where(a => a.ProjectId == id).ToList();
                return Ok(feature);
            }
        }

        /// <summary>
        /// Post feature to db
        /// </summary>
        /// <param name="feature"></param>
        /// <returns></returns>
        [ResponseType(typeof(Features))]
        public IHttpActionResult Post(Features feature)
        {
            using (AngularContext db = new AngularContext())
            {
                db.Features.Add(feature);
                db.SaveChanges();
            }
            return CreatedAtRoute("DefaultApi", new { Id = feature.FeatureId }, feature);
        }

        /// <summary>
        /// delete feature from db by featureId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(Features))]
        public IHttpActionResult Delete(int id)
        {
            using (AngularContext db = new AngularContext())
            {
                var getFeatures = db.Features.FirstOrDefault(a => a.FeatureId == id);
                if (getFeatures != null)
                {
                    db.Features.Remove(getFeatures);
                    db.SaveChanges();
                    return Ok();
                }
                return NotFound();
            }
        }

        /// <summary>
        /// Put feature to db
        /// </summary>
        /// <param name="id"></param>
        /// <param name="feature"></param>
        /// <returns></returns>
        [ResponseType(typeof(Features))]
        public IHttpActionResult Put(int id, Features feature)
        {
            if (id != feature.FeatureId)
            {
                return BadRequest();
            }
            using (AngularContext db = new AngularContext())
            {
                Features getFeatures = db.Features.Find(id);
                getFeatures.FeatureName = feature.FeatureName;
                getFeatures.FeatureDescription = feature.FeatureDescription;
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { Id = feature.FeatureId }, feature);
            }
        }
    }
}
