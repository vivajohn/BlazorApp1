using Microsoft.JSInterop;
using System.Reactive.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reactive.Threading.Tasks;

namespace BlazorApp1.Shared
{
    // This simplifies calling a javascript method which returns an asynchronous result
    public class JSCaller
    {
        // The javascript is synchronous
        public static IObservable<T> Value<T>(IJSRuntime runner, string method)
        {
            return runner.InvokeAsync<T>(method).AsTask().ToObservable();
        }

        // The javascript is asynchronous
        public static IObservable<T> Call<T>(IJSRuntime runner, string method)
        {
            var promise = new JSAsyncResult<T>();
            runner.InvokeAsync<JSAsyncResult<T>>(method, DotNetObjectReference.Create(promise));
            return promise.ToObservable();
        }

        // The javascript is asynchronous
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
