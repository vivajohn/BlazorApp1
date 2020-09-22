using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp1.Shared
{
    // Instantiates an object given an interface
    // TODO: look into DI packages to perhaps replace this
    public class ServiceLocator
    {
        private static IServiceProvider services;

        public static void Init(IServiceProvider provider)
        {
            services = provider;
        }

        public static T GetInstance<T>()
        {
            return services.GetService<T>();
        }
    }
}
