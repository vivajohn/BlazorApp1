using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using BlazorApp1.Shared;
using FlashCommon;
using Google;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.JSInterop;
using Secrets;
using System.Reactive;
using System.Reactive.Linq;
using System.Reactive.Threading.Tasks;

namespace BlazorApp1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Cosmos.Endpoint = Secret.Endpoint;
            Cosmos.AuthKey = Secret.AuthKey;

            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IDynamicDB, DynamicDB>();
            services.AddSingleton<IFirebase, FirebaseService>(sp => new FirebaseService(Secret.FirebaseProjectId));
            services.AddSingleton<IAzure, AzureService>();

            // This removes the buffer size limit on data passed between Blazor and javascript code.
            // The limit causes problems when trying to return a blob from javascript.
            services.AddSignalR(e => e.MaximumReceiveMessageSize = null);

            services.AddRazorPages();
            services.AddServerSideBlazor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapBlazorHub();
                endpoints.MapFallbackToPage("/_Host");
            });

            ServiceLocator.Init(app.ApplicationServices);

            //var dbug = new AzureAdmin();
            //dbug.InitBlobs().Subscribe(_ =>
            //{
            //    Debug.WriteLine("Blobs initialized");
            //});

            // Start the app with the Azure database
            var ddb = app.ApplicationServices.GetService<IDynamicDB>();
            //ddb.SetCurrentDB(() => app.ApplicationServices.GetService<IFirebase>());
            ddb.SetCurrentDB(() => app.ApplicationServices.GetService<IAzure>());
        }

        //private DynamicDB InitServices(IServiceCollection services, IServiceProvider sp)
        //{
        //    var ddb = new DynamicDB();
        //    // Getting the IJSRuntime doesn't work here
        //    Task.Delay(100).ToObservable().Subscribe(_ =>
        //    {
        //        try
        //        {
        //            var js = sp.GetService<IJSRuntime>();
        //            js.InvokeAsync<string>("PlayerService.stopRecording", null).AsTask().ToObservable().Subscribe(id =>
        //            {
        //                services.AddSingleton<IFirebase, FirebaseService>(sp => new FirebaseService(id));
        //                services.AddSingleton<IAzure, AzureService>();

        //                // Start the app with the Firebase database
        //                ddb.SetCurrentDB(() => sp.GetService<IFirebase>());
        //            });
        //        }
        //        catch (Exception ex)
        //        {
        //            Debug.WriteLine(ex.ToString());
        //        }
        //    });
        //    return ddb;
        //}
    }
}
