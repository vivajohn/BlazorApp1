using FlashCommon;
using System;

namespace BlazorApp1.Shared
{
    public class DBChange
    {
        public static void To(DBNames targetDb)
        {
            Func<IDatabase> db;
            if (targetDb == DBNames.Firebase)
            {
                db = () => ServiceLocator.GetInstance<IFirebase>();
            }
            else
            {
                db = () => ServiceLocator.GetInstance<IAzure>();
            }

            var ddb = ServiceLocator.GetInstance<IDynamicDB>();
            ddb.SetCurrentDB(db);
            ddb.Connect();
        }
    }
}
