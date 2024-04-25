#include<iostream>
#include<bits/stdc++.h>
#include<vector>
#include<map>
#include<set>
#include<bitset>
#define MP make_pair
#define PB push_back
#define fi first
#define se second
#define ffo(i, n) for(int i=n-1;i>=0;i--)
#define fo(i,n) for(int i=0;i<n;i++)
#define foo(i,j,n) for(int i=j; i<=n; i++)
using namespace std;


int h(vector<int> &gb,vector<int> &gc)
{
   int n;
cin>>n;
int arr[n];
for(int i=0;i<n;i++)
cin>>arr[i];

vector<int> b,c;
for (int i = 0; i < n;i++)
{
    if(i==0)
    {
        b.push_back(arr[i]);
    }
    else
    {
        bool f = false;
        for (int j = 0; j < b.size();j++)
        {
            if(b[j]%arr[i]==0)
            {
                f = true;
                break;
            }
        }
        if(f)
        {
            f = false;
            for (int j = 0; j < c.size(); j++)
            {
                if(arr[i]%c[j]==0)
                {
                    f = true;
                    break;
                }
            }
            if(f)
            {
                return -1;
            }
            else
            {
                b.push_back(arr[i]);
            }
        }
        else
        {
            c.push_back(arr[i]);
        }
    }
}


gb = b;
gc = c;
return 0;
}
int main(){
int t;
cin>>t;
while(t--)
{
    vector<int> gb, gc;
    int a = h(gb,gc);
    if(a!=-1&&gc.size()!=0)
    {
        cout << gb.size() << " " << gc.size() << endl;
        for (int i = 0; i < gb.size();i++)
        {
            cout << gb[i] << " ";
        }
        cout<<endl;
        for (int i = 0; i < gc.size();i++)
        {
            cout << gc[i] << " ";
        }
        cout << endl;
    }
    else
    cout << -1<<endl;
}
return 0;
}