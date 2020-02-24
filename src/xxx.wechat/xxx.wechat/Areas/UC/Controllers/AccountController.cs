using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using xxx.wechat.Models;

namespace xxx.wechat.Areas.UC.Controllers
{
    [Area("UC")]
    public class AccountController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Regist()
        {
            return View();
        }

        public IActionResult RegistNext()
        {
            return View();
        }

        public IActionResult RegistResult()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }
    }
}
