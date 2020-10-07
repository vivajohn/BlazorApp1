using FlashCommon;
using System;

namespace BlazorApp1.Shared
{
    public class DBChange
    {
        public static void To(DBNames targetDb)
        {
            Func<IDatabase> db;
            switch (targetDb)
            {
                case DBNames.Firebase:
                    db = () => ServiceLocator.GetInstance<IFirebase>();
                    break;
                case DBNames.Python:
                    db = () => ServiceLocator.GetInstance<IPython>();
                    break;
                default:
                    db = () => ServiceLocator.GetInstance<IAzure>();
                    break;
            }

            var ddb = ServiceLocator.GetInstance<IDynamicDB>();
            ddb.SetCurrentDB(db);
            ddb.Connect();
        }
    }
}
