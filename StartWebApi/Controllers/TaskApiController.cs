using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AngularJSApi.Models;

namespace AngularJSApi.Controllers
{
    public class TaskApiController : ApiController
    {
        /// <summary>
        /// geting all tasks from db </summary>
        /// <returns></returns>
        public IEnumerable<Task> Get()
        {
            using (AngularContext db = new AngularContext())
            {
                return db.Tasks.ToList();
            }
        }

        /// <summary>
        /// get task from db by featureId
        /// </summary>
        /// <param name="featureId">From angular controller</param>
        /// <returns></returns>
        public IHttpActionResult Get(int featureId)
        {
            using (AngularContext db = new AngularContext())
            {
                var task = db.Tasks.Where(a => a.FeatureId == featureId).ToList();
                return Ok(task);
            }
        }

        // POST api/<controller>
        /// <summary>
        /// post task to db
        /// </summary>
        /// <param name="task">From angular controller</param>
        /// <returns></returns>
        public IHttpActionResult Post(Task task)
        {
            using (AngularContext db = new AngularContext())
            {
                db.Tasks.Add(task);
                db.SaveChanges();
            }
            return CreatedAtRoute("DefaultApi", new { Id = task.TaskId }, task);
        }

        // PUT api/<controller>/5
        /// <summary>
        /// put task
        /// </summary>
        /// <param name="id">From angular controller</param>
        /// <param name="task">From angular controller</param>
        /// <returns></returns>
        public IHttpActionResult Put(int id, Task task)
        {
            if (id != task.FeatureId)
            {
                return BadRequest();
            }
            else
            {
                using (AngularContext db = new AngularContext())
                {
                    Task getTask = db.Tasks.Find(id);
                    getTask.FeatureId = task.FeatureId;
                    getTask.DeveloperId = task.DeveloperId;
                    getTask.Open = task.Open;
                    getTask.WorkLoad = task.WorkLoad;
                    getTask.Description = task.Description;
                    getTask.ClosingDate = task.ClosingDate;
                    db.SaveChanges();

                    return CreatedAtRoute("DefaultApi", new { Id = task.TaskId }, task);
                }
            }
        }

        // DELETE api/<controller>/5
        /// <summary>
        /// delete task from db by TaskID
        /// </summary>
        /// <param name="id">From angular controller</param>
        /// <returns></returns>
        public IHttpActionResult Delete(int id)
        {
            using (AngularContext db = new AngularContext())
            {
                var getTask = db.Tasks.FirstOrDefault(a => a.TaskId == id);
                if (getTask != null)
                {
                    db.Tasks.Remove(getTask);
                    db.SaveChanges();
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
        }
    }
}