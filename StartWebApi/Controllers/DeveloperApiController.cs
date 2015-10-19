using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using AngularJSApi.Models;

namespace AngularJSApi.Controllers
{
    public class DeveloperApiController : ApiController
    {
        /// <summary>
        /// Geting all Developers from db
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Developer> GetAll()
        {
            using (AngularContext objDemoContext = new AngularContext())
            {
                return objDemoContext.Developer.ToList();
            }
        }
        //GET/<controller>
        /// <summary>
        /// Getting one developer by DeveloperID
        /// </summary>
        /// <param name="id">From angular controller</param>
        /// <returns></returns>
        public IHttpActionResult Get(int id)
        {
            using (AngularContext objDemoContext = new AngularContext())
            {
                var employee = objDemoContext.Developer.FirstOrDefault(a => a.DeveloperId == id);
                if (employee != null)
                {
                    return Ok(employee);
                }
                return NotFound();
            }

        }

        //POST api<controller>
        /// <summary>
        /// Post developer to db
        /// </summary>
        /// <param name="developer">From angular controller</param>
        /// <returns></returns>
        [ResponseType(typeof(Developer))]
        public IHttpActionResult Post(Developer developer)
        {
            using (AngularContext objDemoContext = new AngularContext())
            {
                objDemoContext.Developer.Add(developer);
                objDemoContext.SaveChanges();
            }
            return CreatedAtRoute("DefaultApi", new { Id = developer.DeveloperId }, developer);
        }

        //DELETE api/<controller>
        /// <summary>
        /// Delete developer from db
        /// </summary>
        /// <param name="id">From angular controller</param>
        /// <returns></returns>
        [ResponseType(typeof(Developer))]
        public IHttpActionResult Delete(int id)
        {
            using (AngularContext objDemoContext = new AngularContext())
            {
                var getEmployee = objDemoContext.Developer.FirstOrDefault(a => a.DeveloperId == id);
                if (getEmployee != null)
                {
                    objDemoContext.Developer.Remove(getEmployee);
                    objDemoContext.SaveChanges();
                    return Ok();
                }
                return NotFound();
            }
        }

        //PUT api/<controller>
        /// <summary>
        /// put developer to db
        /// </summary>
        /// <param name="id">From angular controller</param>
        /// <param name="developer">From angular controller</param>
        /// <returns></returns>
        [ResponseType(typeof(Developer))]
        public IHttpActionResult Put(int id, Developer developer)
        {
            if (id != developer.DeveloperId)
            {
                return BadRequest();
            }
            using (AngularContext contextObj = new AngularContext())
            {
                Developer getEmployee = contextObj.Developer.Find(id);
                getEmployee.Name = developer.Name;
                getEmployee.Salary = developer.Salary;
                contextObj.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { Id = developer.DeveloperId }, developer);
            }
        }
    }
}
