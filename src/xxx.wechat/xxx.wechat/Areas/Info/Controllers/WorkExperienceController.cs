using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using xxx.wechat.Models;

namespace xxx.wechat.Areas.UC.Controllers
{
    [Area("Info")]
    public class WorkExperienceController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Edit(int id)
        {
            return View();
        }

        public IActionResult Add()
        {
            return View();
        }
    }
}
