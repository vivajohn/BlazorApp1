using Microsoft.JSInterop;
using System.Reactive.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorApp1.Shared
{
    // This simplifies calling a javascript method which returns an asynchronous result
    public class JSCaller
    {
        public static IObservable<T> Call<T>(IJSRuntime runner, string method)
        {
            var promise = new JSAsyncResult<T>();
            runner.InvokeAsync<JSAsyncResult<T>>(method, DotNetObjectReference.Create(promise));
            return promise.ToObservable();
        }

        public static IObservable<T> Call<T>(IJSRuntime runner, string method, params object[] data)
        {
            var promise = new JSAsyncResult<T>();
            var list = new List<object>(data);
            list.Insert(0, DotNetObjectReference.Create(promise));
            runner.InvokeAsync<JSAsyncResult<T>>(method, list.ToArray());
            return promise.ToObservable();
        }
    }
}
