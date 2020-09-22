using FlashCommon;
using Google;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;

namespace BlazorApp1.Shared
{
    public enum DBNames
    {
        Azure,
        Firebase
    }

    public class DBChange
    {
        public static void To(DBNames targetDb)
        {
            IDatabase db;
            if (targetDb == DBNames.Firebase)
            {
                db = ServiceLocator.GetInstance<IFirebase>();
            }
            else
            {
                db = ServiceLocator.GetInstance<IAzure>();
            }

            var ddb = ServiceLocator.GetInstance<IDynamicDB>();
            ddb.SetCurrentDB(db);
        }
    }
}
