using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using AngularJSApi.Models;

namespace AngularJSApi.Controllers
{
    public class ProjectApiController : ApiController
    {
        /// <summary>
        /// getting all projects from db
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Project> GetAll()
        {
            using (AngularContext db = new AngularContext())
            {
                return db.Project.ToList();
            }
        }

        /// <summary>
        /// get one project from db by Id
        /// </summary>
        /// <param name="id">From angular controller</param>
        /// <returns></returns>
        public IHttpActionResult Get(int id)
        {
            using (AngularContext db = new AngularContext())
            {
                var project = db.Project.FirstOrDefault(a => a.Id == id);
                if (project != null)
                {
                    return Ok(project);
                }
                else
                {
                    return NotFound();
                }
            }
        }

        /// <summary>
        /// Post project to db
        /// </summary>
        /// <param name="project">From angular controller</param>
        /// <returns></returns>
        [ResponseType(typeof(Project))]
        public IHttpActionResult Post(Project project)
        {
            using (AngularContext objDemoContext = new AngularContext())
            {
                objDemoContext.Project.Add(project);
                objDemoContext.SaveChanges();
            }
            return CreatedAtRoute("DefaultApi", new { Id = project.Id }, project);
        }

        /// <summary>
        /// Delete project from db by Id
        /// </summary>
        /// <param name="id">From angular controller</param>
        /// <returns></returns>
        [ResponseType(typeof(Project))]
        public IHttpActionResult Delete(int id)
        {
            using (AngularContext objDemoContext = new AngularContext())
            {
                var getProject = objDemoContext.Project.FirstOrDefault(a => a.Id == id);
                if (getProject != null)
                {
                    objDemoContext.Project.Remove(getProject);
                    objDemoContext.SaveChanges();
                    return Ok();
                }
                return NotFound();
            }
        }

        /// <summary>
        /// Put project
        /// </summary>
        /// <param name="id">From angular controller</param>
        /// <param name="project">From angular controller</param>
        /// <returns></returns>
        [ResponseType(typeof(Project))]
        public IHttpActionResult Put(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }
            using (AngularContext contextObj = new AngularContext())
            {

                Project getProject = contextObj.Project.Find(id);
                getProject.Name = project.Name;
                contextObj.SaveChanges();
                return CreatedAtRoute("DefaultApi", new { Id = project.Id }, project);
            }
        }
    }
}
