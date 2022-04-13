
# Project Open High Performance Counters (open.hpc) .NET library

Introduction:

* .NET library for profiling the time of code blocks.

## Table of Contents

1. [About the Project](#about-the-project)
1. [Project Status](#project-status)
1. [Getting Started](#getting-started)
    1. [Dependencies](#dependencies)
    1. [Building](#building)
    2. [Running Tests](#running-tests)
        1. [Other Tests](#other-tests)
    1. [Installation](#installation)
    1. [Usage](#usage)
1. [Release Process](#release-process)
    1. [Versioning](#versioning)
    1. [Payload](#payload)
1. [How to Get Help](#how-to-get-help)
1. [Contributing](#contributing)
1. [Further Reading](#further-reading)
1. [License](#license)
1. [Authors](#authors)
1. [Acknowledgments](#acknowledgments)

## About the Project

* Library enables you to profile execution of single or multiple metered code blocks inside the loop.
* Gives statistics on how many times metered code block was called, what was the total, average, maximal, minimum, and other delta times code block needed to execute.
* Instead of using [GetTicksCount](https://docs.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-gettickcount) which has resolution between 10 and 16 millisecond, this library uses high resolution counter available through Windows kernel function [QueryPerformanceCounter](https://docs.microsoft.com/en-us/windows/win32/api/profileapi/nf-profileapi-queryperformancecounter) which has resolution of processor frequency < 1 μs.

An example of usage
```
using(HPCMeterSum sum = new HPCMeterSum("meter"))
{
  /* metered code block */
}
```

**[Back to top](#table-of-contents)**

## Project Status

build status:

[![Build Status](http://your-server:12345/job/badge/icon)](http://your-server/job/badge/icon/)

Current status of project it is based on .NET Framework and language C# 7.3.
Core 5.0 compiles, so it should compile normally on most .NET versions.

**[Back to top](#table-of-contents)**

## Getting Started

### Dependencies

You need .NET C# compiler capable of compiling .NET Language C# 7.3 written code.
Visual Studio's Community editions 2017, 2019, or 2022 will do fine.
And some Windows due kernel function [QueryPerformanceCounter](https://docs.microsoft.com/en-us/windows/win32/api/profileapi/nf-profileapi-queryperformancecounter) it uses. 

### Getting the Source

This project is [hosted on GitHub](https://github.com/SoLaRGit/open.hpc). You can clone this project directly using this command:

```
git clone git@github.com:SoLaRGit/open.hpc.git
```

### Building

Instructions for how to build the project

#### Using Visual Studio

Open `open.hpc' project in Visual Studio, select desired configuration, and run the Build.

#### Using nmake

```
TODO: Examples should be included
```

### Running Tests

There are no unit test for this project, there is open.hpc.test project that validates the library and demonstrates the usage.

#### Other Tests

There are not other test (formatting checks, coding style checks, or static analysis tests).

### Installation

When the project is compiled the project artifacts (binaries) shall output to the following relative path

    AnyCpu (Release) : bin\release
    x64 (Release)    : bin\x64\release
    x86 (Release)    : bin\x86\release

You will need to copy them to your Project references path and add `open.hpc.dll` as reference.

### Usage

Include `open.hpc` as reference to the project you intent to profile.
In the using section of source file add `using open.hpc;`, and you are ready to use the library.
For more details check the library documentation.

```
using(HPCMeterSum sum = new HPCMeterSum("meter"))
{
  /* metered code block */
}
```

Profiling execution of metered code block inside the loop, gives statistics on how many times metered code block was called, 
what was the total, average, maximal, minimum, and other delta times to execute.

```
HPCMeter meter0 = new HPCMeter("meter0");
for(int i = 0; i < 1000000; i++)
{
  using(HPCMeterSum sum = new HPCMeterSum("meter"))
  {
    /* metered code block */
  }
}
```

(API reference documents on GitHub.io)[https://SoLaRGit.github.io/docs/open.hpc/]

An example of statistical data
```
    HPC v22.411.0.0 [MSIL|JITOpt] (PE:I386 ILOnly) @ 2022-04-12 10:08:43
    Collection[1002]::ShowStatistics() from open.hpc.test.Program::Main()
      open.hpc.test : [MSIL|JITOpt] (PE:I386 ILOnly)
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │ meter :  sumtime  /     cnt ~  average  [    %] |      times *  time.min [++] ~  time.max [++] :   max-min (  max-avrg ,  avrg-min ) over time improving  │
    ├───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
    │ In1   : 1.0066165 / 4000000 ~ 0.0000003 [1.070] | 341699.574 * 0.0000000 [ 2] ~ 0.0341700 [ 4] : 0.0341700 ( 0.0341697 , 0.0000003 ) ++++++++++++++++++++ │
    │ In2   : 0.9981559 / 4000000 ~ 0.0000002 [1.061] | 319258.861 * 0.0000000 [ 2] ~ 0.0319259 [11] : 0.0319259 ( 0.0319256 , 0.0000002 ) ++++++++++++++++++++ │
    │ In3   : 0.9665509 / 4000000 ~ 0.0000002 [1.028] | 151465.504 * 0.0000000 [ 2] ~ 0.0151466 [ 8] : 0.0151466 ( 0.0151463 , 0.0000002 ) ++++++++++++++++++++ │
    │ In4   : 0.9404046 / 4000000 ~ 0.0000002 [1.000] | 171228.350 * 0.0000000 [ 2] ~ 0.0171228 [11] : 0.0171228 ( 0.0171226 , 0.0000002 ) ++++++++++++++++++++ │
    │ Out1  : 1.5675204 /     400 ~ 0.0039188 [1.041] |     26.827 * 0.0027390 [ 9] ~ 0.0734794 [ 4] : 0.0707404 ( 0.0695606 , 0.0011798 ) +++++............... │
    │ Out2  : 1.5268255 /     400 ~ 0.0038171 [1.014] |     12.893 * 0.0027480 [17] ~ 0.0354298 [ 6] : 0.0326818 ( 0.0316127 , 0.0010691 ) ++.................. │
    │ Out3  : 1.5114540 /     400 ~ 0.0037786 [1.004] |     13.442 * 0.0027970 [ 1] ~ 0.0375969 [11] : 0.0347999 ( 0.0338182 , 0.0009816 ) ++.................. │
    │ Out4  : 1.5057920 /     400 ~ 0.0037645 [1.000] |     13.469 * 0.0027551 [10] ~ 0.0371094 [ 7] : 0.0343543 ( 0.0333449 , 0.0010093 ) ++.................. │
    │ total : 1.9492459 /       4 ~ 0.4873115 [1.000] |      1.220 * 0.4490737 [ 2] ~ 0.5477933 [ 2] : 0.0987196 ( 0.0604818 , 0.0382378 ) .................... │
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**[Back to top](#table-of-contents)**

## Release Process

### Versioning

This project uses [Semantic Versioning](http://semver.org/). For a list of available versions, see the [repository tag list](https://github.com/SoLaRGit/open.hpc/tags).

Assembly information version shall be updated to have the following string:

    [two-digits-year].[two-digits-month][two-digits-day].[Patch].[Revision]

version example : `22.0407.0.0`

* [two-digits-year] : `22`
* [two-digits-month] : `04`
* [two-digits-day] : `07`
* [Patch] : `0`
* [Revision] : `0`

Decompiling the example version results in date : `2022.04.07`

Note: [Patch] and [Revision] are reserved for future use, and not in use at the moment.

### Payload

**[Back to top](#table-of-contents)**

## How to Get Help

Users who need to get further help or need to report the issue go to GitHub Project Issues:
(`open.hpc` Issues on GitHub)(https://github.com/SoLaRGit/open.hpc/issues)

## Contributing

We encourage public contributions! 
Please review [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct and development process.

**[Back to top](#table-of-contents)**

## Further Reading

links to other relevant documentation

(QueryPerformanceCounter on MSDN)(https://docs.microsoft.com/en-us/windows/win32/api/profileapi/nf-profileapi-queryperformancecounter)

**[Back to top](#table-of-contents)**

## License

Copyright (c) 2022 Nikola Božović. All rights reserved. 

This code is licensed under the MIT License (MIT) 
See [LICENSE.md](LICENSE.md) file for details.

**[Back to top](#table-of-contents)**

## Authors

* **[Nikola Božović](https://github.com/SoLaRGit)** - *Initial work* - [SoLaRGit on GitHub](https://github.com/SoLaRGit)

Also see the list of [contributors](https://github.com/SoLaRGit/open.hpc/contributors) who participated in this project.

**[Back to top](#table-of-contents)**

## Acknowledgments

Proper credits, shout-outs, and honorable mentions here. Links to relevant repositories, blog posts, or contributors.

**[Back to top](#table-of-contents)**


